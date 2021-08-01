spnr.GameEngine.AbstractCanvasSizer = class {
    updateCanvasSize() {
        throw Error('Method "calcCanvasSize" not overwritten in class ' + 
            'extending from AbstractCanvasSizer');
    }
}