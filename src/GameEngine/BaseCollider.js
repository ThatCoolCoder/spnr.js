spnr.GameEngine.colliderTypes = {
    circle : 'circle'
}

/**
 * Base collider for spnr.GameEngine.
 * Colliders aren't really implemented yet so this documentation is a placeholder.
 * @class
 */
spnr.GameEngine.BaseCollider = class extends spnr.GameEngine.Entity {
    constructor(name, type, localPosition, localAngle) {
        super(name, localPosition, localAngle);

        this.type = type;

        this.colliding = false;

        this.collideStartCallbacks = new spnr.FunctionGroup();
        this.collideEndCallbacks = new spnr.FunctionGroup();
    }
}