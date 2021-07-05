spnr.GameEngine.colliderTypes = {
    circle : 'circle'
}

spnr.GameEngine.BaseCollider = class extends spnr.GameEngine.Entity {
    constructor(name, type, localPosition, localAngle) {
        super(name, localPosition, localAngle);

        this.type = type;

        this.colliding = false;

        this.collideStartCallbacks = new spnr.FunctionGroup();
        this.collideEndCallbacks = new spnr.FunctionGroup();
    }
}