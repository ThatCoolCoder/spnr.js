/**
 * Fixed aspect ratio canvas sizer that fills the page by scaling the canvas instead of expanding it.
 * @class
 * @extends {spnr.GameEngine.AbstractCanvasSizer}
 */
spnr.GameEngine.FixedARCanvasSizer = class extends spnr.GameEngine.AbstractCanvasSizer {
    /**
     * Create a new sizer. See properties for descriptions of arguments.
     * @param {spnr.Vector} targetSize 
     * @param {spnr.Vector} padding 
     * @param {number} [minScale=0] 
     * @param {number} [maxScale=Infinity] 
     */
    constructor(targetSize, padding, minScale=0, maxScale=Infinity) {
        super();
        /**
         * Size of the canvas if the scale was 1. Use a sensible value like 800x500
         * @member
         * @type {spnr.Vector}
         */
        this.targetSize = spnr.v.copy(targetSize);
        /**
         * Padding between the canvas and the edge of the page. If the canvas is not aligned with css, will be all on the bottom right.
         * @member
         * @type {spnr.Vector}
         */
        this.padding = spnr.v.copy(padding);
        /**
         * Minimum scale of the canvas. If this value is too large, canvas may not fit on smaller screens.
         * @member
         * @type {number}
         */
        this.minScale = minScale;
        /**
         * Maximum scale of the canvas. If this value is too small, canvas may not expand fully on large screens.
         * @member
         * @type {number}
         */
        this.maxScale = maxScale;
    }

    /**
     * @private
     */
    updateCanvasSize() {
        var targetAspectRatio = this.targetSize.x / this.targetSize.y;
        var availableArea = spnr.v.copySub(spnr.dom.viewportSize(), this.padding);
    
        var availableAspectRatio = availableArea.x / availableArea.y;
    
        // If the target is 'wider' than the window
        if (targetAspectRatio > availableAspectRatio) {
            var sizeMult = availableArea.x / this.targetSize.x;
        }
        // If the target is 'taller' than the window
        else {
            var sizeMult = availableArea.y / this.targetSize.y;
        }
        spnr.GameEngine.setCanvasSize(this.targetSize);
        spnr.GameEngine.setGlobalScale(sizeMult);
    }
}