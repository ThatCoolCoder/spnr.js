/**
 * Abstract canvas sizer
 * @class
 */
spnr.GameEngine.AbstractCanvasSizer = class {
    /**
     * Method called to update the canvas size
     * @virtual
     */
    updateCanvasSize() {
        throw Error('Method "calcCanvasSize" not overwritten in class ' + 
            'extending from AbstractCanvasSizer');
    }
}