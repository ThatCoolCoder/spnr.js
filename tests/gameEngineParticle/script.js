spnr.GameEngine.init(spnr.v(800, 500), 1, 0x000000);

var mainScene = new spnr.GameEngine.Scene('Main scene');

var particleTemplate = {
    texture : spnr.GameEngine.Texture.fromUrl('boom.png'),
    minSize : spnr.v(30, 30),
    maxSize : spnr.v(60, 60),
    minSpeed : 20,
    maxSpeed : 300,
    minTimeToLive : 1,
    maxTimeToLive : 3,
    effectorStrengths : {
        gravity : 400,
        gravityDirection : 0,
        airFriction : 4
    }
}

var emitterData = {
    particleTemplate : particleTemplate,
    shape : 'circle',
    amount : 50,
    interval : 0,
    delay : 0.25
}

var effect = new spnr.GameEngine.ParticleEffect('particle effect',
    spnr.v.copyDiv(spnr.GameEngine.canvasSize, 2), 0, emitterData);

mainScene.addChild(effect);

spnr.GameEngine.selectScene(mainScene);
effect.play();