spnr.GameEngine = class {
    constructor(canvasSize, globalScale, backgroundColor=0x000000) {
        spnr.internalWarn('spnr.GameEngine is an undocumented, untested festure. Use with caution');
        
        this.globalPosition = spnr.v(0, 0);
        this.globalAngle = 0;

        this.setGlobalScale(globalScale);

        this.createPixiApp(canvasSize, backgroundColor);

        this.deselectCrntScene();
    }

    // Pixi stuff and canvas stuff
    // ---------------------------

    createPixiApp(canvasSize, backgroundColor) {
        this.pixiApp = new PIXI.Application({
            width : canvasSize.x * this.globalScale,
            height : canvasSize.y * this.globalScale,
            backgroundColor : backgroundColor,
            resolution : window.devicePixelRatio || 1
        });
        document.body.appendChild(this.pixiApp.view);

        this.pixiApp.ticker.add(() => this.update());
        this.pixiApp.stage.parent = this.pixiApp; // give a link to the stage

        this.setCanvasSize(canvasSize);
    }

    setCanvasSize(size) {
        this.canvasSize = spnr.v.copy(size);

        this.pixiApp.view.width = this.canvasSize.x * this.globalScale;
        this.pixiApp.view.height = this.canvasSize.y * this.globalScale;
    }

    setGlobalScale(scale) {
        this.globalScale = scale;
    }

    removeChildrenFromPixiApp() {
        while(this.pixiApp.stage.children.length > 0) { 
            this.pixiApp.stage.removeChild(this.pixiApp.stage.children[0]);
        }
    }

    // Scenes
    // ------

    selectScene(scene) {
        this.deselectCrntScene();
        
        this.crntScene = scene;
        
        if (scene != null) {
            scene.select(this.pixiApp);
            scene.setParent(this);
        }
    }

    deselectCrntScene() {
        if (this.crntScene != null) {
            this.crntScene.deselect();
            this.removeChildrenFromPixiApp();
        }

        this.crntScene = null;
    }

    // Main method
    // -------------

    update() {
        if (this.crntScene != null) {
            this.crntScene.update();
        }
    }
}