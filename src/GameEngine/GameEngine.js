spnr.GameEngine = class {
    static pixiApp;
    static canvasSize;
    
    static globalPosition;
    static globalAngle;
    static globalScale;

    static crntScene;
    static crntCanvasSizer;

    // Time since last frame in seconds
    static deltaTime;

    static init(canvasSize, globalScale, backgroundColor=0x000000) {
        spnr.internalWarn('spnr.GameEngine is an undocumented, untested festure. Use with caution');
        
        // Set these so the children know where they are
        this.globalPosition = spnr.v(0, 0);
        this.globalAngle = 0;

        this.setGlobalScale(globalScale);

        this.createPixiApp(canvasSize, backgroundColor);

        this.deselectCrntScene();

        this.keyboard = new spnr.KeyWatcher();
        this.mouse = new spnr.MouseWatcher(this.pixiApp.view);
    }

    // Pixi stuff and canvas stuff
    // ---------------------------

    static createPixiApp(canvasSize, backgroundColor) {
        this.pixiApp = new PIXI.Application({
            width : canvasSize.x * this.globalScale,
            height : canvasSize.y * this.globalScale,
            backgroundColor : backgroundColor,
            resolution : window.devicePixelRatio || 1
        });
        document.body.appendChild(this.pixiApp.view);

        this.pixiApp.ticker.add(() => this.update());

        this.pixiApp.stage.pivot.set(0.5, 0.5);

        this.setCanvasSize(canvasSize);
        this.setGlobalScale(this.globalScale);
    }

    static setCanvasSize(size) {
        this.canvasSize = spnr.v.copy(size);

        this.pixiApp.view.width = this.canvasSize.x * this.globalScale;
        this.pixiApp.view.height = this.canvasSize.y * this.globalScale;

        this.pixiApp.renderer.resize(this.canvasSize.x * this.globalScale,
            this.canvasSize.y * this.globalScale)
    }

    static selectCanvasSizer(canvasSizer=null) {
        this.crntCanvasSizer = canvasSizer;
    }

    static setGlobalScale(scale) {
        this.globalScale = scale;
        if (this.pixiApp != undefined) {
            this.pixiApp.stage.scale.set(this.globalScale, this.globalScale);
        }
        if (this.canvasSize != undefined) {
            this.setCanvasSize(this.canvasSize);
        }
    }

    static removeChildrenFromPixiApp() {
        while(this.pixiApp.stage.children.length > 0) { 
            this.pixiApp.stage.removeChild(this.pixiApp.stage.children[0]);
        }
    }

    static get backgroundColor() {
        return this.pixiApp.renderer.backgroundColor;
    }

    static setBackgroundColor(color) {
        this.pixiApp.renderer.backgroundColor = color;
    }

    // Scenes
    // ------

    static selectScene(scene) {
        this.deselectCrntScene();
        
        this.crntScene = scene;
        
        if (scene != null) {
            scene.select(this.pixiApp);
            scene.setParent(this);
        }
    }

    static deselectCrntScene() {
        if (this.crntScene != null) {
            this.crntScene.deselect();
            this.removeChildrenFromPixiApp();
        }

        this.crntScene = null;
    }

    // Entity lookup
    // -------------

    static get entitiesInScene() {
        if (this.crntScene != null) {
            return this.crntScene.flattenedChildList;
        }
        else {
            return [];
        }
    }

    static getEntitiesWithName(name) {
        // Get all entities in the scene with name
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            if (entity.name == name) searchResults.push(entity);
        });
        return searchResults;
    }

    static getEntitiesWithoutName(name) {
        // Get all entities in the scene without name
        // (not sure why you'd want it)
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            if (entity.name != name) searchResults.push(entity);
        });
        return searchResults;
    }

    static getEntitiesWithNames(names) {
        // Get all the entities in the scene with one of names
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            // Use for...of to allow break
            for (var name of names) {
                if (entity.name == name) {
                    searchResults.push(entity);
                    break;
                }
            }
        });
        return searchResults;
    }

    static getEntitiesWithTag(tag) {
        // Get all of the entities in the scene tagged with tag
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            if (entity.tags.includes(tag)) searchResults.push(entity);
        });
        return searchResults;
    }

    static getEntitiesWithTags(tags) {
        // Get all of the entities in the scene tagged with tag
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            // Use for...of to allow break
            for (var tag of tags) {
                if (entity.tags.includes(tag)) {
                    searchResults.push(entity);
                    break;
                }
            }
        });
        return searchResults;
    }

    // Main method
    // -----------

    static update() {
        this.deltaTime = this.pixiApp.ticker.elapsedMS / 1000;

        if (this.crntScene != null) {
            this.crntScene.internalUpdate();
        }

        if (this.crntCanvasSizer != null) {
            this.crntCanvasSizer.updateCanvasSize();
        }
    }
}