spnr.GameEngine.DrawableEntity = class extends spnr.GameEngine.Entity {
    constructor(name, localPosition, localAngle, texture, textureSize, anchor=spnr.v(0.5, 0.5)) {
        super(name, localPosition, localAngle);

        this.setTexture(texture, textureSize);
        this.setAnchor(anchor);
        this.setTint(0xffffff);

        this.setupMouseInteraction();
    }

    setupMouseInteraction() {
        if (this.mouseHovering == undefined) this.mouseHovering = false;

        this.sprite.interactive = true;

        if (this.mouseDownCallbacks == undefined) {
            this.mouseDownCallbacks = new spnr.FunctionGroup();
        }
        this.sprite.mousedown = data => this.mouseDownCallbacks.call(data);
        this.sprite.touchstart = data => this.mouseDownCallbacks.call(data);
        
        if (this.mouseUpCallbacks == undefined) {
            this.mouseUpCallbacks = new spnr.FunctionGroup();
        }
        this.sprite.mouseup = data => this.mouseUpCallbacks.call(data);
        this.sprite.touchend = data => this.mouseUpCallbacks.call(data);

        
        if (this.mouseOverCallbacks == undefined) {
            this.mouseOverCallbacks = new spnr.FunctionGroup();
        }
        this.sprite.mouseover = data => {
            this.mouseHovering = true;
            this.mouseOverCallbacks.call(data);
        }

        this.mouseOutCallbacks = new spnr.FunctionGroup();
        this.sprite.mouseout = data => {
            this.mouseHovering = false;
            this.mouseOutCallbacks.call(data);
        }
    }

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

    setTextureSize(size) {
        this.textureSize = spnr.v.copy(size);
        this.sprite.width = this.textureSize.x;
        this.sprite.height = this.textureSize.y;
    }

    setContainingScene(scene) {
        this.containingScene = scene;
        if (scene != null) {
            scene.pixiContainer.addChild(this.sprite);
            this.setChildrensContainingScene(scene);
            this.containingScene.flattenedChildList.push(this);
        }
    }

    removeFromContainingScene() {
        if (this.containingScene != null) {
            this.containingScene.pixiContainer.removeChild(this.sprite);
            this.removeChildrenFromContainingScene();
            spnr.arr.removeItem(this.containingScene.flattenedChildList, this);
        }
        this.containingScene = null;
    }

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

    setAnchor(position) {
        // from 0,0 to 1,1
        
        this.anchor = spnr.v.copy(position);
        this.sprite.anchor.x = position.x;
        this.sprite.anchor.y = position.y;
    }

    setTint(tint) {
        this.sprite.tint = tint;
    }

    get tint() {
        return this.sprite.tint;
    }

    setVisible(state) {
        this.sprite.visible = state;
    }

    get visible() {
        return this.sprite.visible;
    }

    setAlpha(alpha) {
        this.sprite.alpha = alpha;
    }

    get alpha() {
        return this.sprite.alpha;
    }

    updateSpritePosition() {
        var globalPosition = this.globalPosition;
        this.sprite.position.set(globalPosition.x, globalPosition.y);
        this.sprite.rotation = this.globalAngle + spnr.PI;
    }

    internalUpdate() {
        this.updateSpritePosition();

        // This needs to be after the block above - 
        // otherwise, if this entity's parent gets removed in update(),
        // the call to globalPosition above will break
        this.updateChildren();
        this.update();
    }
}