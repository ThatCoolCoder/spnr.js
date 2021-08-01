spnr.GameEngine.init(spnr.v(800, 500), 1, 0x999999);

var fixedARSizer = new spnr.GameEngine.FixedARCanvasSizer(spnr.v(800, 500), spnr.v(30, 30));
var fillPageSizer = new spnr.GameEngine.FillPageCanvasSizer(spnr.v(10, 10));

spnr.GameEngine.selectCanvasSizer(fixedARSizer);

var scene = new spnr.GameEngine.Scene('Main scene');

var heading = new spnr.GameEngine.Label('Heading', 'Choose a canvas sizing mode:',
    spnr.v(400, 100), spnr.PI);
scene.addChild(heading);

var fixedARButton = new spnr.GameEngine.Button('Fixed AR button',
    spnr.v(400, 200), spnr.PI, spnr.v(240, 40), PIXI.Texture.WHITE,
    'Fixed Aspect Ratio');
fixedARButton.mouseDownCallbacks.add(() => {
    spnr.GameEngine.selectCanvasSizer(fixedARSizer);
});
scene.addChild(fixedARButton);

var fillPageButton = new spnr.GameEngine.Button('Fill page button',
    spnr.v(400, 300), spnr.PI, spnr.v(120, 40), PIXI.Texture.WHITE,
    'Fill Page');
fillPageButton.mouseDownCallbacks.add(() => {
    spnr.GameEngine.selectCanvasSizer(fillPageSizer);
});
scene.addChild(fillPageButton);

spnr.GameEngine.selectScene(scene);