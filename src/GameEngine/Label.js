/**
 * Label/text class
 * @class
 * @extends {spnr.GameEngine.Entity}
 */
spnr.GameEngine.Label = class extends spnr.GameEngine.Entity {
    /**
     * Create a new label
     * @param {string} name 
     * @param {string} text 
     * @param {spnr.Vector} localPosition 
     * @param {number} localAngle 
     * @param {object} format - see {@link https://pixijs.io/pixi-text-style/}
     * @param {spnr.Vector} anchor - position of drawn text relative to origin. From 0,0 to 1,1 
     */
    constructor(name, text, localPosition, localAngle,
        format={}, anchor=spnr.v(0.5, 0.5)) {
        super(name, localPosition, localAngle);

        this.setTextFormat(format);
        this.setText(text);
        this.setAnchor(anchor);
    }

    /**
     * @private
     * @param {spnr.GameEngine.Scene} scene 
     */
    setContainingScene(scene) {
        this.containingScene = scene;
        if (scene != null) {
            scene.pixiContainer.addChild(this.textSprite);
            this.setChildrensContainingScene(scene);
            this.containingScene.flattenedChildList.push(this);
        }
    }

    /**
     * @private
     */
    removeFromContainingScene() {
        if (this.containingScene != null) {
            this.containingScene.pixiContainer.removeChild(this.textSprite);
            this.removeChildrenFromContainingScene();
            spnr.arr.removeItem(this.containingScene.flattenedChildList, this);
        }
        this.containingScene = null;
    }
    /**
     * Set the format/styling of the text.
     * @param {object} format - see {@link https://pixijs.io/pixi-text-style/} 
     */
    setTextFormat(format) {
        /**
         * see {@link https://pixijs.io/pixi-text-style/}
         * @member
         * @type {object}
         * @readonly
         */
        this.textFormat = spnr.obj.oneLevelCopy(format);
        
        // Protection for before the text is set
        if (this.text != undefined) {
            
            this.updateTextSprite();
        }
    }

    /**
     * Set the text. Quite slow so only call if you need to
     * @param {string} text 
     */
    setText(text) {
        this.text = text;

        // Protection for before the text format is set
        if (this.text != undefined) {
            
            this.updateTextSprite();
        }
    }

    setAnchor(position) {
        // from 0,0 to 1,1

        this.textSprite.anchor.x = position.x;
        this.textSprite.anchor.y = position.y;
    }

    /**
     * Set whether the text is visible
     * @param {boolean} state 
     */
    setVisible(state) {
        this.textSprite.visible = state;
    }

    /**
     * Whether the text is visible
     * @member
     * @type {boolean}
     * @readonly
     */
    get visible() {
        return this.textSprite.visible;
    }

    /**
     * @private
     */
    internalUpdate() {
        this.updateChildren();
        this.update();

        var globalPosition = this.globalPosition;
        this.textSprite.position.set(globalPosition.x, globalPosition.y);
        this.textSprite.rotation = this.globalAngle + spnr.PI;
    }

    /**
     * Force-update the text sprite (mainly used by the engine). Quite slow so don't call unless you need to.
     */
    updateTextSprite() {
        if (this.textSprite != undefined) {
            if (this.textSprite.parent != undefined) {
                // Remove the old sprite
                var oldParent = this.textSprite.parent;
                oldParent.removeChild(this.textSprite);
            }
            var oldAnchor = this.textSprite.anchor;
        }
        this.textSprite = new PIXI.Text(this.text, this.textFormat);

        if (oldAnchor != undefined) {
            this.setAnchor(oldAnchor);
        }

        if (oldParent != undefined) {
            oldParent.addChild(this.textSprite);
        }
    }
}