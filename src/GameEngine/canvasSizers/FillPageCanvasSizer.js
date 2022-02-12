/**
 * Canvas sizer that aims to fill the page as much as possible. Doesn't scale the canvas but instead just expands it.
 * Does not maintain aspect ratio
 * @class
 * @extends {spnr.GameEngine.AbstractCanvasSizer}
 */
spnr.GameEngine.FillPageCanvasSizer = class extends spnr.GameEngine.AbstractCanvasSizer {
    /**
     * Create a new sizer
     * @param {spnr.Vector} padding 
     */
    constructor(padding) {
        super();
        /**
         * Padding between the edge of the canvas and the page. Used because having no padding will generally overflow in many browsers.
         * If the canvas isn't aligned with css, the padding is all on the bottom and right.
         * @type {spnr.Vector}
         * @member
         */
        this.padding = spnr.v.copy(padding);
    }

    /**
     * @private
     */
    updateCanvasSize() {
        var size = spnr.v.copySub(spnr.dom.viewportSize(), this.padding);
        spnr.GameEngine.setGlobalScale(1);
        spnr.GameEngine.setCanvasSize(size);
    }
}