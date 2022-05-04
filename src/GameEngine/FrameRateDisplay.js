/**
 * Class that shows the current frame rate of the engine.
 * Mainly useful for performance purposes but you can also include it in a finished game.
 * @class
 * @extends {spnr.GameEngine.Label}
 */
spnr.GameEngine.FrameRateDisplay = class extends spnr.GameEngine.Label {
    /**
     * 
     * @param {string} name 
     * @param {spnr.GameEngine.FrameRateDisplayCorner} [corner] - what corner of the screen to display in
     * @param {spnr.Vector} [padding=spnr.v(20, 20)] - padding from edge of screen
     * @param {number} [updateInterval=5] - update every n frames
     * @param {number} [decimalPlaces=0] - round fps values to this many decimal places
     */
    constructor(name, corner=spnr.GameEngine.FrameRateDisplayCorner.bottomRight, padding=spnr.v(20, 20), updateInterval=5, decimalPlaces=0) {
        super(name, '', spnr.v(0, 0), spnr.PI);
        this.useDefaultTextFormat();
        this.corner = corner;
        this.padding = padding;
        this.updateInterval = updateInterval;
        this.decimalPlaces = decimalPlaces;

        this.frameCount = 0;
        this.runningTotal = 0;
    }

    /**
     * Use the default format
     */
    useDefaultTextFormat() {
        this.setTextFormat({
            fill: '#ffffff',
            fontSize: 28,
            stroke: '#000000',
            strokeThickness: 1
        })
    }

    internalUpdate() {
        this.frameCount ++;
        this.runningTotal += 1 / spnr.GameEngine.deltaTime;
        if (this.frameCount % this.updateInterval == 0) {
            var average = this.runningTotal / this.updateInterval;
            this.setText(spnr.round(average, this.decimalPlaces).toFixed(this.decimalPlaces));
            this.runningTotal = 0;
        }

        switch (this.corner) {
            case spnr.GameEngine.FrameRateDisplayCorner.topLeft:
                this.setLocalPosition(this.padding);
                break;
            case spnr.GameEngine.FrameRateDisplayCorner.topRight:
                this.setLocalPosition(spnr.v(spnr.GameEngine.canvasSize.x - this.padding.x, 0));
                break;
            case spnr.GameEngine.FrameRateDisplayCorner.bottomLeft:
                this.setLocalPosition(spnr.v(0, spnr.GameEngine.canvasSize.y - this.padding.y));
                break;
            case spnr.GameEngine.FrameRateDisplayCorner.bottomRight:
                this.setLocalPosition(spnr.v.copySub(spnr.GameEngine.canvasSize, this.padding));
                break;
        }
        super.internalUpdate();
    }
}

/**
 * @memberof spnr.GameEngine
 * @readonly
 * @enum
 */
spnr.GameEngine.FrameRateDisplayCorner = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0
};
spnr.obj.toEnum(spnr.GameEngine.FrameRateDisplayCorner);