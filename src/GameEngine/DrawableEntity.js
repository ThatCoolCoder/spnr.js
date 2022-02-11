/**
 * Drawable entity (sprite) class.
 * @extends {spnr.GameEngine.Entity}
 * @class
 */
spnr.GameEngine.DrawableEntity = class extends spnr.GameEngine.Entity {
    /**
     * Create a new drawable entity (sprite)
     * @param {string} name 
     * @param {spnr.Vector} localPosition 
     * @param {number} localAngle 
     * @param {spnr.GameEngine.Texture} texture 
     * @param {spnr.Vector} textureSize 
     * @param {spnr.Vector} [anchor=spnr.v(0.5, 0.5)] - Position of texture relative to origin, from 0,0 to 1,1. 
     */
    constructor(name, localPosition, localAngle, texture, textureSize, anchor=spnr.v(0.5, 0.5)) {
        super(name, localPosition, localAngle);

        this.setTexture(texture, textureSize);
        this.setAnchor(anchor);
        this.setTint(0xffffff);

        this.setupMouseInteraction();
    }

    /**
     * Helper to set up mouse interactions so we don't bloat constructor
     * @private
     */
    setupMouseInteraction() {
        if (this.mouseHovering == undefined) {
            /**
             * Whether the mouse is currently hovering over this
             * @type {boolean}
             * @member
            */
            this.mouseHovering = false;
        }

        this.sprite.interactive = true;

        if (this.mouseDownCallbacks == undefined) {
            /**
             * Function group called when mouse or touchscreen press starts over this
             * @type {spnr.FunctionGroup}
             * @member
             */
            this.mouseDownCallbacks = new spnr.FunctionGroup();
        }
        this.sprite.mousedown = data => this.mouseDownCallbacks.call(data);
        this.sprite.touchstart = data => this.mouseDownCallbacks.call(data);
        
        if (this.mouseUpCallbacks == undefined) {
            /**
             * Function group called when mouse or touchscreen press ends over this
             * @type {spnr.FunctionGroup}
             * @member
             */
            this.mouseUpCallbacks = new spnr.FunctionGroup();
        }
        this.sprite.mouseup = data => this.mouseUpCallbacks.call(data);
        this.sprite.touchend = data => this.mouseUpCallbacks.call(data);

        
        if (this.mouseOverCallbacks == undefined) {
            /**
             * Function group called when mouse or touchscreen touch enters this
             * @type {spnr.FunctionGroup}
             * @member
             */
            this.mouseOverCallbacks = new spnr.FunctionGroup();
        }
        this.sprite.mouseover = data => {
            this.mouseHovering = true;
            this.mouseOverCallbacks.call(data);
        }

        if (this.mouseOutCallbacks == undefined) {
            /**
             * Function group called when mouse or touchscreen touch exits this
             * @type {spnr.FunctionGroup}
             * @member
             */
            this.mouseOutCallbacks = new spnr.FunctionGroup();
        }
        this.sprite.mouseout = data => {
            this.mouseHovering = false;
            this.mouseOutCallbacks.call(data);
        }
    }

    /**
     * Get the corner positions of this. Not sure why it was implemented.
     * @returns {spnr.Vector[]} corners in order [topLeft, topRight, bottomRight, bottomLeft]
     */
    getGlobalCornerPositions() {
        // Cache global position here for more speed
        var globalPosition = this.globalPosition;
        
        var topLeftPos = spnr.v(this.textureSize.x * -(1 - this.anchor.x),
            this.textureSize.y * -(1 - this.anchor.y));
        spnr.v.rotate(topLeftPos, this.localAngle);
        spnr.v.add(topLeftPos, globalPosition);

        var topRightPos = spnr.v(this.textureSize.x * this.anchor.x,
            this.textureSize.y * -(1 - this.anchor.y));
        spnr.v.rotate(topRightPos, this.localAngle);
        spnr.v.add(topRightPos, globalPosition);

        var bottomRightPos = spnr.v(this.textureSize.x * this.anchor.x,
            this.textureSize.y * this.anchor.y);
        spnr.v.rotate(bottomRightPos, this.localAngle);
        spnr.v.add(bottomRightPos, globalPosition);

        var bottomLeftPos = spnr.v(this.textureSize.x * -(1 - this.anchor.x),
            this.textureSize.y * this.anchor.y);
        spnr.v.rotate(bottomLeftPos, this.localAngle);
        spnr.v.add(bottomLeftPos, globalPosition);

        return [topLeftPos, topRightPos, bottomRightPos, bottomLeftPos];
    }

    /**
     * Set the texture size
     * @param {spnr.Vector} size 
     */
    setTextureSize(size) {
        /**
         * Size of the texture, in pixels
         * @readonly
         * @type {spnr.Vector}
         * @member
         */
        this.textureSize = spnr.v.copy(size);
        this.sprite.width = this.textureSize.x;
        this.sprite.height = this.textureSize.y;
    }

    /**
     * @private
     * @param {spnr.GameEngine.Scene} scene 
     */
    setContainingScene(scene) {
        this.containingScene = scene;
        if (scene != null) {
            scene.pixiContainer.addChild(this.sprite);
            this.setChildrensContainingScene(scene);
            this.containingScene.flattenedChildList.push(this);
        }
    }

    /**
     * @private
     */
    removeFromContainingScene() {
        if (this.containingScene != null) {
            this.containingScene.pixiContainer.removeChild(this.sprite);
            this.removeChildrenFromContainingScene();
            spnr.arr.removeItem(this.containingScene.flattenedChildList, this);
        }
        this.containingScene = null;
    }

    /**
     * Set the texture size of this entity
     * @param {spnr.GameEngine.Texture} texture 
     * @param {spnr.Vector} textureSize 
     */
    setTexture(texture, textureSize=this.textureSize) {
        if (this.sprite != undefined) {
            var containingScene = this.containingScene;
            var anchor = this.sprite.anchor;

            if (containingScene != undefined) {
                this.removeFromContainingScene(); // remove old sprite
            }
        }

        this.sprite = new PIXI.Sprite(texture);
        this.setTextureSize(textureSize);
        this.setupMouseInteraction();
        if (this.parent != null) this.updateSpritePosition();
        if (this.tint != undefined) {
            this.setTint(this.tint);
        }

        if (containingScene != undefined) {
            this.setContainingScene(containingScene); // add new sprite
        }
        if (anchor != undefined) {
            this.setAnchor(anchor);
        }
    }

    /**
     * Set anchor of the texture, from 0,0 to 1,1
     * @param {spnr.Vector} position 
     */
    setAnchor(position) {
        this.anchor = spnr.v.copy(position);
        this.sprite.anchor.x = position.x;
        this.sprite.anchor.y = position.y;
    }

    /**
     * Set tint (color) of entity. If the entity is a white texture, then tint will directly correspond to color.
     * @param {number} tint 
     */
    setTint(tint) {
        this.sprite.tint = tint;
    }

    /**
     * Tint of the entity
     * @readonly
     * @type {number}
     * @member
     */
    get tint() {
        return this.sprite.tint;
    }

    /**
     * Set whether the entity is visible
     * @param {boolean} state 
     */
    setVisible(state) {
        this.sprite.visible = state;
    }

    /**
     * Whether the entity is visible
     * @member
     * @readonly
     * @type {boolean}
     */
    get visible() {
        return this.sprite.visible;
    }

    /**
     * Set alpha (transparency) of the entity
     * @param {number} alpha - transparency from 0 to 1
     */
    setAlpha(alpha) {
        this.sprite.alpha = alpha;
    }

    /**
     * Transparency of the entity from 0 to 1
     * @member
     * @readonly
     * @type {number}
     */
    get alpha() {
        return this.sprite.alpha;
    }

    /**
     * Update the sprite's position
     * @private
     */
    updateSpritePosition() {
        var globalPosition = this.globalPosition;
        this.sprite.position.set(globalPosition.x, globalPosition.y);
        this.sprite.rotation = this.globalAngle + spnr.PI;
    }

    /**
     * Internal update method called by the engine
     * @private
     */
    internalUpdate() {
        this.updateSpritePosition();

        // This needs to be after the block above - 
        // otherwise, if this entity's parent gets removed in update(),
        // the call to globalPosition above will break
        this.updateChildren();
        this.update();
    }
}