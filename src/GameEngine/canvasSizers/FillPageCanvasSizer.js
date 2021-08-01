spnr.GameEngine.FillPageCanvasSizer = class extends spnr.GameEngine.AbstractCanvasSizer {
    constructor(padding) {
        super();
        this.padding = spnr.v.copy(padding);
    }

    updateCanvasSize() {
        var size = spnr.v.copySub(spnr.dom.viewportSize(), this.padding);
        spnr.GameEngine.setGlobalScale(1);
        spnr.GameEngine.setCanvasSize(size);
    }
}