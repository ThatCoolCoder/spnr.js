/**
 * Basic entity in the game engine. Can be parented to a scene or other entities.
 * Not very useful on its own, designed to be extended to add behaviour
 * @class
 */
spnr.GameEngine.Entity = class {
    /**
     * Create a new entity.
     * @param {string} name - name of the entity. Doesn't have to be unique but setting a good name can help with debugging. 
     * @param {spnr.Vector} localPosition - position of the entity relative to parent
     * @param {number} localAngle - rotation of the entity relative to parent. Rotation is applied after position.
     */
    constructor(name, localPosition, localAngle) {
        this.rename(name);

        this.setLocalPosition(localPosition);
        this.setLocalAngle(localAngle);

        this.tags = [];

        this.children = [];

        this.containingScene = null;
    }

    // Misc
    // ----

    /**
     * Set name
     * @param {string} name - new name 
     */
    rename(name) {
        this.name = name;
    }

    /**
     * Add a tag to the entity. Tags are useful for looking up entities of a specific type - see {@link spnr.GameEngine.getEntitiesWithTag}.
     * An entity can have multiple tags. You can add the same tag multiple times but why would you want to.
     * @param {string} tag 
     */
    addTag(tag) {
        this.tags.push(tag);
    }

    /**
     * Add multiple tags to the entity at once
     * @param {string[]} tagArray 
     */
    addTags(tagArray) {
        this.tags.push(...tagArray);
    }

    /**
     * Remove a tag from the entity. If the tag has been added multiple times, then it will only remove one instance of the tag.
     * @param {string[]} tag 
     */
    removeTag(tag) {
        spnr.arr.removeItem(this.tags, tag);
    }

    // Position
    // --------

    
    /**
     * Get the global position of the entity, relative to the canvas.
     * Avoid where possible it very much because it's recursive and thus slow.
     * (future improvements include adding a cache)
     * @type {spnr.Vector}
     * @readonly
     */
    get globalPosition() {
        var rotatedLocalPosition = spnr.v.copy(this.localPosition);
        spnr.v.rotate(rotatedLocalPosition, this.parent.localAngle);
        return spnr.v.copyAdd(this.parent.globalPosition, rotatedLocalPosition);
    }

    /**
     * Set the position of this entity relative to its parent.
     * @param {spnr.Vector} position 
     */
    setLocalPosition(position) {
        /**
         * Local position of this entity relative to parent
         * @member
         * @readonly
         */
        this.localPosition = spnr.v.copy(position);
    }

    /**
     * Set the global position of this entity.
     * Avoid where possible because it's recursive and thus slow.
     * @param {spnr.Vector} position 
     */
    setGlobalPosition(position) {
        this.setLocalPosition(spnr.v.copySub(position, this.parent.globalPosition));
    }

    // Angle
    // -----

    /**
     * Get the global angle of this entity, relative to the canvas.
     * Avoid where possible because it's recursive and thus slow.
     * @type {number}
     * @readonly
     */
    get globalAngle() {
        return this.parent.globalAngle + this.localAngle;
    }

    /**
     * Set the local angle of this entity, relative to the parent
     * @param {number} angle 
     */
    setLocalAngle(angle) {
        /**
         * Local rotation of this entity relative to parent
         * @member
         * @readonly
         */
        this.localAngle = angle;
    }

    /**
     * Set the global angle of this entity
     * @param {*} angle 
     */
    setGlobalAngle(angle) {
        this.setLocalAngle(angle - this.parent.globalAngle);
    }

    // Pixi and adding to scene
    // ------------------------

    /**
     * Whether this entity is currently in a scene
     * @type {boolean}
     */
    get isInScene() {
        return this.containingScene != null;
    }

    /**
     * Set a direct reference to the scene that this is in
     * @private
     * @param {spnr.GameEngine.Scene} scene 
     */
    setContainingScene(scene) {
        // do nothing except add children - overwrite in drawable entities
        this.containingScene = scene;
        if (this.containingScene != null) {
            this.containingScene.flattenedChildList.push(this);
        }
        this.setChildrensContainingScene(scene);
    }

    /**
     * Set the containing scene for the entity's children. Call through {@link spnr.GameEngine.Entity.setContainingScene}
     * @private
     * @param {spnr.GameEngine.Scene} scene 
     */
    setChildrensContainingScene(scene) {
        this.children.forEach(child => {
            child.setContainingScene(scene);
        });
    }

    /**
     * Called when is removed from a scene
     * @private
     */
    removeFromContainingScene() {
        this.removeChildrenFromContainingScene();
        if (this.containingScene != null) {
            spnr.arr.removeItem(this.containingScene.flattenedChildList, this);
        }
        this.containingScene = null;
    }

    /**
     * Called when is removed from a scene. Call through {@link spnr.GameEngine.Entity.removeFromContainingScene}
     * @private
     */
    removeChildrenFromContainingScene() {
        this.children.forEach(child => {
            child.removeFromContainingScene();
        });
    }

    // Children/parents
    // ----------------

    /**
     * Remove all children from this scene
     */
    removeChildren() {
        // While there are children, remove the first child
        while (this.children.length > 0) {
            this.removeChild(this.children[0]);
        }
    }

    /**
     * Add a child entity.
     * @param {spnr.GameEngine.Entity} entity 
     * @returns {boolean} - whether the entity was  added (if false, it means the entity was already a child)
     */
    addChild(entity) {
        // If the entity is already a child, then don't do anything
        if (this.children.includes(entity)) {
            spnr.internalWarn(`Could not add entity '${entity.name}' to entity '${this.name}' as it is already a child`);
            return false;
        }
        else {
            this.children.push(entity);
            entity.setParent(this);
            return true;
        }
    }

    /**
     * Remove a specific entity from this
     * @param {spnr.GameEngine.Entity} entity 
     * @returns {boolean} - whether the entity was removed (if false, it means the entity was not a child to begin with)
     */
    removeChild(entity) {
        var indexOfEntity = this.children.indexOf(entity);

        // If the entity is not a child, then do nothing
        if (indexOfEntity == -1) {
            spnr.internalWarn(`Could not remove entity '${entity.name}' from entity '${this.name}' as it is not a child`);
            return false;
        }
        else {
            spnr.arr.removeItem(this.children, entity);
            entity.removeFromContainingScene();
            entity.removeParent();
            return true;
        }
    }

    /**
     * Set the parent of the entity. Called through {@link spnr.GameEngine.Entity.addChild}.
     * @param {spnr.GameEngine.Entity} parent 
     * @private
     */
    setParent(parent) {
        this.parent = parent;

        if (this.parent != null) {

            if (this.parent.isInScene) {
                this.setContainingScene(this.parent.containingScene);
            }

        }
        else {
            this.setContainingScene(null);
        }
    }

    /**
     * Unset the parent of the entity. Called through {@link spnr.GameEngine.Entity.removeChild}
     * @private
     */
    removeParent() {
        this.setParent(null);
        this.setContainingScene(null);
    }

    // Update

    /**
     * Update the children of the entity
     * @private
     */
    updateChildren() {
        this.children.forEach(child => {
            child.internalUpdate();
        });
    }

    /**
     * Internal update method called by the engine
     * @private
     */
    internalUpdate() {
        this.updateChildren();
        this.update();
    }

    /**
     * Update method called every frame. Override this to add behaviour to entities.
     * @virtual
     */
    update() { }
}