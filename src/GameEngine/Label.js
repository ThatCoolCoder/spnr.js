spnr.GameEngine.Label = class extends spnr.GameEngine.Entity {
    constructor(name, text, localPosition, localAngle,
        format={}, anchor=spnr.v(0.5, 0.5)) {
        super(name, localPosition, localAngle);

        this.setTextFormat(format);
        this.setText(text);
        this.setAnchor(anchor);
    }

    setContainingScene(scene) {
        this.containingScene = scene;
        if (scene != null) {
            scene.pixiContainer.addChild(this.textSprite);
            this.setChildrensContainingScene(scene);
            this.containingScene.flattenedChildList.push(this);
        }
    }

    removeFromContainingScene() {
        if (this.containingScene != null) {
            this.containingScene.pixiContainer.removeChild(this.textSprite);
            this.removeChildrenFromContainingScene();
            spnr.arr.removeItem(this.containingScene.flattenedChildList, this);
        }
        this.containingScene = null;
    }

    setTextFormat(format) {
        this.textFormat = spnr.obj.oneLevelCopy(format);
        
        // Protection for before the text is set
        if (this.text != undefined) {
            
            this.updateTextSprite();
        }
    }

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

    setVisible(state) {
        this.textSprite.visible = state;
    }

    internalUpdate() {
        this.updateChildren();
        this.update();

        var globalPosition = this.globalPosition;
        this.textSprite.position.set(globalPosition.x, globalPosition.y);
        this.textSprite.rotation = this.globalAngle + spnr.PI;
    }

    updateTextSprite() {
        // Quite slow so don't call if you don't need to

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