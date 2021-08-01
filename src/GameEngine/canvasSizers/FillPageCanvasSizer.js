spnr.GameEngine.FillPageCanvasSizer = class extends spnr.GameEngine.AbstractCanvasSizer {
    constructor(padding, targetScale=null) {
        super();
        this.padding = spnr.v.copy(padding);
        this.targetScale = targetScale;
    }

    updateCanvasSize() {
        var size = spnr.v.copySub(spnr.dom.viewportSize(), this.padding);
        if (this.targetScale != null) {
            spnr.v.div(size, this.targetScale);
            spnr.GameEngine.setGlobalScale(this.targetScale);
        }
        spnr.GameEngine.setCanvasSize(size);
    }
}