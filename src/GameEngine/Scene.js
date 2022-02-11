/**
 * Scene class that can be selected and displayed.
 * @class
 * @extends {spnr.GameEngine.Entity}
 */
spnr.GameEngine.Scene = class extends spnr.GameEngine.Entity {
    /**
     * Create a new scene
     * @param {string} name 
     * @param {spnr.Vector} localPosition 
     * @param {number} localAngle 
     */
    constructor(name, localPosition=spnr.v(0, 0), localAngle=0) {
        super(name, localPosition, localAngle);

        this.pixiContainer = new PIXI.Container();

        this.isSelected = false;
        this.flattenedChildList = [];
    }

    /**
     * I'm not sure what this does and maybe it's broken
     * @private
     */
    get globalAngle() {
        return 0;
    }

    /**
     * Set the background sound, which loops whenever the scene is selected
     * @param {spnr.Sound} sound 
     */
    setBackgroundSound(sound) {
        /**
         * Sound that loops whenever the scene is selected
         * @member
         * @readonly
         * @type {spnr.Sound}
         */
        this.backgroundSound = sound;
        spnr.internalLog('Does this need a copy or something?');

        if (this.isSelected) {
            this.startBackgroundSound();
        }
    }

    /**
     * @private
     */
    startBackgroundSound() {
        if (this.backgroundSound != null) {
            this.backgroundSound.loop();
        }
    }

    /**
     * @private
     */
    stopBackgroundSound() {
        if (this.backgroundSound != null) {
            this.backgroundSound.stop();
        }
    }

    /**
     * Add a child to the scene
     * @param {spnr.GameEngine.Entity} child 
     */
    addChild(child) {
        var inheritedFunc = spnr.GameEngine.Entity.prototype.addChild.bind(this);
        var childAdded = inheritedFunc(child);

        if (childAdded) {
            child.setContainingScene(this);
        }
    }

    /**
     * Method run when the scene is selected. Override to use.
     * @virtual
     */
    onSelected() {

    }

    /**
     * Do not call directly, call through spnr.GameEngine.selectScene
     * @param {PIXI.Application} pixiApp 
     * @private
     */
    select(pixiApp) {
        this.isSelected = true;

        this.parentAppPointer = pixiApp;
        
        pixiApp.stage.addChild(this.pixiContainer);

        this.startBackgroundSound();
        this.onSelected();
    }

    /**
     * Method run when the scene is deselected. Override to use.
     * @virtual
     */
    onDeselected() {
        
    }
    /**
     * Do not call directly, call through spnr.GameEngine.deselectCrntScene or spnr.GameEngine.selectScene(aSceneOtherThanThisOne)
     * @private
     */
    deselect() {
        this.isSelected = false;
        this.parentAppPointer.stage.removeChild(this.pixiContainer);
        this.parentAppPointer = null;

        this.stopBackgroundSound();
        this.onDeselected();
    }

    /**
     * Override of setParent to make it just parent the game engine
     * @param {spnr.GameEngine} gameEngine 
     * @private
     */
    setParent(gameEngine) {
        this.parent = gameEngine;
    }

    /**
     * @private
     */
    internalUpdate() {
        this.updateChildren();
        this.update();

        this.pixiContainer.rotation = this.localAngle;
    }
}