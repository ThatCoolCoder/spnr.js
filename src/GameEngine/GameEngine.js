/**
 * Lightweight code-only game engine using PIXI.js for rendering.
 * If using, you must include PIXI version 5 or greater in your project and then run {@link spnr.GameEngine.init}.
 * @namespace
 */
spnr.GameEngine = class {
    /**
     * Initialize the game engine
     * @param {spnr.Vector} canvasSize - initial canvas size. See {@link spnr.GameEngine.setGlobalScale} for details on canvas scaling and sizing
     * @param {number} globalScale - scale multiplier for the canvas size
     * @param {number} backgroundColor - background color in hex format. eg 0xff0000 is red.
     */
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

    /**
     * @private
     */
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

    /**
     * Set the canvas size. Note that the true canvas size will be different - see {@link spnr.GameEngine.setGlobalScale} for details.
     * @param {spnr.Vector} size - new size
     */
    static setCanvasSize(size) {
        /**
         * todo: make jsdoc pick this up
         */
        this.canvasSize = spnr.v.copy(size);

        this.pixiApp.view.width = this.canvasSize.x * this.globalScale;
        this.pixiApp.view.height = this.canvasSize.y * this.globalScale;

        this.pixiApp.renderer.resize(this.canvasSize.x * this.globalScale,
            this.canvasSize.y * this.globalScale)
    }

    /**
     * Choose an automatic canvas sizer to use. Greatly recommended to use as it adapts to different window sizes.
     * @param {spnr.GameEngine.canvasSizers.AbstractCanvasSizer} canvasSizer 
     */
    static selectCanvasSizer(canvasSizer=null) {
        this.crntCanvasSizer = canvasSizer;
    }

    /**
     * Set the global scale of the canvas. From the viewpoint of an entity on the canvas, it will still be the same width in pixels.
     * However, the size of the canvas displayed to the user will be increased.
     * @param {number} scale 
     */
    static setGlobalScale(scale) {
        this.globalScale = scale;
        if (this.pixiApp != undefined) {
            this.pixiApp.stage.scale.set(this.globalScale, this.globalScale);
        }
        if (this.canvasSize != undefined) {
            this.setCanvasSize(this.canvasSize); // resize actual canvas
        }
    }

    /**
     * Remove all items from the pixi app (clear canvas)
     * @private
     */
    static removeChildrenFromPixiApp() {
        while(this.pixiApp.stage.children.length > 0) { 
            this.pixiApp.stage.removeChild(this.pixiApp.stage.children[0]);
        }
    }

    /**
     * Background color of the canvas. See {@link spnr.GameEngine.init} for color details
     * @readonly
     */
    static get backgroundColor() {
        return this.pixiApp.renderer.backgroundColor;
    }

    /**
     * Set the background color
     * @param {number} color 
     */
    static setBackgroundColor(color) {
        this.pixiApp.renderer.backgroundColor = color;
    }

    // Scenes
    // ------

    /**
     * Select the current scene of the game engine
     * @param {*} scene 
     */
    static selectScene(scene) {
        this.deselectCrntScene();
        
        this.crntScene = scene;
        
        if (scene != null) {
            scene.select(this.pixiApp);
            scene.setParent(this);
        }
    }

    /**
     * Set the current scene to nothing, displaying just the background color
     */
    static deselectCrntScene() {
        if (this.crntScene != null) {
            this.crntScene.deselect();
            this.removeChildrenFromPixiApp();
        }

        this.crntScene = null;
    }

    // Entity lookup
    // -------------

    /**
     * Get a flattened list of all the entities in the scene
     * @returns {spnr.GameEngine.Entity[]}
     */
    static get entitiesInScene() {
        if (this.crntScene != null) {
            return this.crntScene.flattenedChildList;
        }
        else {
            return [];
        }
    }

    /**
     * Get all entities with a specific name
     * @param {string} name - name of the entities to find
     * @returns {spnr.GameEngine.Entity[]}
     */
    static getEntitiesWithName(name) {
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            if (entity.name == name) searchResults.push(entity);
        });
        return searchResults;
    }

    /**
     * Get all entities without a specific name. Not sure why you'd want it. 
     * @param {string} name 
     * @returns {spnr.GameEngine.Entity[]}
     */
    static getEntitiesWithoutName(name) {
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            if (entity.name != name) searchResults.push(entity);
        });
        return searchResults;
    }

    /**
     * Get all entities with one or more of a set of names
     * @param {string[]} names 
     * @returns {spnr.GameEngine.Entity[]}
     */
    static getEntitiesWithNames(names) {
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

    /**
     * Get all entities with a specific tag
     * @param {string} tag 
     * @returns {spnr.GameEngine.Entity[]}
     */
    static getEntitiesWithTag(tag) {
        var searchResults = [];
        this.entitiesInScene.forEach(entity => {
            if (entity.tags.includes(tag)) searchResults.push(entity);
        });
        return searchResults;
    }

    /**
     * Get all entities with one or more of a set of tags
     * @param {string[]} tags 
     * @returns {spnr.GameEngine.Entity[]}
     */
    static getEntitiesWithTags(tags) {
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

        this.mouse.scale = this.globalScale; // update mouse position scale
    }
}