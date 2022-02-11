/**
 * Clickable button.
 * @extends {spnr.GameEngine.DrawableEntity}
 */
spnr.GameEngine.Button = class extends spnr.GameEngine.DrawableEntity {
    /**
     * Create a new button. Yes constructor is confusing, maybe in future we will use a dictionary to emulate named parameters
     * @param {string} name 
     * @param {spnr.Vector} localPosition 
     * @param {name} localAngle 
     * @param {spnr.Vector} size - size in pixels of the button background. If null then defaults to a transparent background.
     * @param {spnr.GameEngine.Texture} background 
     * @param {string} text 
     * @param {object} textFormat - see {@link spnr.GameEngine.Label}
     * @param {spnr.Vector} anchor 
     */
    constructor(name, localPosition, localAngle, size, background=null,
        text='', textFormat={}, anchor) {

        if (background === null) background = PIXI.Texture.Empty;

        super(name, localPosition, localAngle, background, size, anchor);
        
        /**
         * Text of the button.
         * @type {spnr.GameEngine.Label}
         * @member
         */
        this.label = new spnr.GameEngine.Label(this.name + ' label', text,
            spnr.v(0, 0), 0, textFormat);
        this.addChild(this.label)
    }
}