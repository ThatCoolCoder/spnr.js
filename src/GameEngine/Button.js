spnr.GameEngine.Button = class extends spnr.GameEngine.DrawableEntity {
    constructor(name, localPosition, localAngle, size, background=null,
        text='', textFormat={}, anchor) {

        if (background === null) background = PIXI.Texture.Empty;

        super(name, localPosition, localAngle, background, size, anchor);
        
        this.label = new spnr.GameEngine.Label(this.name + ' label', text,
            spnr.v(0, 0), 0, textFormat);
        this.addChild(this.label)
    }
}