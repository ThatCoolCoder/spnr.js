spnr.GameEngine.Particle = class extends spnr.GameEngine.DrawableEntity {
    // This class is only designed to be used internally by spnr.GameEngine.ParticleEffect

    constructor(name, localPosition, localAngle, texture, size,
            velocity, timeToLive, effectorStrengths) {
        super(name, localPosition, localAngle, texture, size);
        this.addTag('Particle');
        this.velocity = spnr.v.copy(velocity);
        this.timeToLive = timeToLive;
        this.effectorStrengths = effectorStrengths;
        this.airFrictionMult = 0.001;

        this.acceleration = spnr.v(0, 0);
    }

    feelEffectors() {
        if (this.effectorStrengths.gravity) {
            var forceVector = spnr.v(0, this.effectorStrengths.gravity);
            spnr.v.rotate(forceVector, this.effectorStrengths.gravityDirection);
            spnr.v.add(this.acceleration, forceVector);
        }
        if (this.effectorStrengths.airFriction) {
            var dragAmount = spnr.v.mag(this.velocity);
            dragAmount *= dragAmount;
            dragAmount *= this.effectorStrengths.airFriction *
                this.airFrictionMult;

            var dragVector = spnr.v.copy(this.velocity);
            spnr.v.normalize(dragVector);
            spnr.v.mult(dragVector, dragAmount);
            spnr.v.sub(this.acceleration, dragVector);
        }
    }

    update() {
        if (this.timeToLive < 0) this.parent.removeChild(this);

        if (this.effectorStrengths) this.feelEffectors();

        spnr.v.mult(this.acceleration, spnr.GameEngine.deltaTime);
        spnr.v.add(this.velocity, this.acceleration);

        var distToMove = spnr.v.copyMult(this.velocity, spnr.GameEngine.deltaTime);
        spnr.v.add(this.localPosition, distToMove);

        spnr.v.makeZero(this.acceleration);

        this.timeToLive -= spnr.GameEngine.deltaTime;
    }
}