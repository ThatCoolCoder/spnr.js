spnr.GameEngine.Entity = class {
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

    rename(name) {
        this.name = name;
    }

    addTag(tag) {
        this.tags.push(tag);
    }

    addTags(tagArray) {
        this.tags.push(...tagArray);
    }

    removeTag(tag) {
        spnr.arr.removeItem(this.tags, tag);
    }

    // Position
    // --------

    /** Try not to use this extensively because it's recursive and laggy */
    get globalPosition() {
        var rotatedLocalPosition = spnr.v.copy(this.localPosition);
        spnr.v.rotate(rotatedLocalPosition, this.parent.localAngle);
        return spnr.v.copyAdd(this.parent.globalPosition, rotatedLocalPosition);
    }

    setLocalPosition(position) {
        this.localPosition = spnr.v.copy(position);
    }

    setGlobalPosition(position) {
        this.setLocalPosition(spnr.v.copySub(position, this.parent.globalPosition));
    }

    // Angle
    // -----

    get globalAngle() {
        return this.parent.globalAngle + this.localAngle;
    }

    setLocalAngle(angle) {
        this.localAngle = angle;
    }

    setGlobalAngle(angle) {
        this.setLocalAngle(angle - this.parent.globalAngle);
    }

    // Pixi and adding to scene
    // ------------------------

    get isInScene() {
        return this.containingScene != null;
    }

    setContainingScene(scene) {
        // do nothing except add children - overwrite in drawable entities
        this.containingScene = scene;
        if (this.containingScene != null) {
            this.containingScene.flattenedChildList.push(this);
        }
        this.setChildrensContainingScene(scene);
    }

    /** Do not call directly, call through spnr.GameEngine.Entity.setContainingScene */
    setChildrensContainingScene(scene) {
        this.children.forEach(child => {
            child.setContainingScene(scene);
        });
    }

    removeFromContainingScene() {
        this.removeChildrenFromContainingScene();
        if (this.containingScene != null) {
            spnr.arr.removeItem(this.containingScene.flattenedChildList, this);
        }
        this.containingScene = null;
    }

    removeChildrenFromContainingScene() {
        this.children.forEach(child => {
            child.removeFromContainingScene();
        });
    }

    // Children/parents
    // ----------------

    removeChildren() {
        // While there are children, remove the first child
        while (this.children.length > 0) {
            this.removeChild(this.children[0]);
        }
    }

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

    removeParent() {
        this.setParent(null);
        this.setContainingScene(null);
    }

    // Update

    updateChildren() {
        this.children.forEach(child => {
            child.internalUpdate();
        });
    }

    internalUpdate() {
        this.updateChildren();
        this.update();
    }

    // To be overwritten by the libarry user - just here as a safety
    update() { }
}