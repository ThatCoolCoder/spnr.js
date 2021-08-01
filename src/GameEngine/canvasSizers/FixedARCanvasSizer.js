spnr.GameEngine.FixedARCanvasSizer = class extends spnr.GameEngine.AbstractCanvasSizer {
    constructor(targetSize, padding, minScale=0, maxScale=Infinity) {
        super();
        this.targetSize = spnr.v.copy(targetSize);
        this.padding = spnr.v.copy(padding);
        this.minScale = minScale;
        this.maxScale = maxScale;
    }

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