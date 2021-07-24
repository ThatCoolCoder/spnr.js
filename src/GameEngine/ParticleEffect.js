spnr.GameEngine.ParticleEffect = class extends spnr.GameEngine.Entity {
    /*
    Example of emitterData:
    {
        particleTemplate : <a particle template>, (see below)
        shape : <'circle'||'arc'||'line'>,
        amount : <number>,
        delay : <number>, (in seconds)
        interval : <number>, (in seconds)
        minAngle : <number>, (only needed for shape:'arc')
        maxAngle : <number> (only needed for shape:'arc')
    }

    Example of particleTemplate:
    {
        texture : <spnr.GameEngine.Texture>,
        tint : <a hex color>, (optional, defaults to no tint)
        minSize : <spnr.v>,
        maxSize : <spnr.v>,
        minSpeed : <number>,
        maxSpeed : <number>,
        minTimeToLive : <number>, (seconds)
        maxTimeToLive : <number>, (seconds)
        effectorStrengths : {
            airFriction : <number>
            gravity : <number>,
            gravityDirection : <number> (radians)
        }
    }
    */

    timer = 0;
    playing = false;
    particlesRemaining = false;

    constructor(name, localPosition, localAngle, emitterData, looping=false,
        deleteWhenFinished=false) {
        super(name, localPosition, localAngle);
        this.emitterData = emitterData;
        this.looping = looping;
        this.deleteWhenFinished = false;
    }

    play() {
        // Only remove the children if the effect is non-looping,
        // as removing them spoils the loop illusion
        if (! this.looping) this.removeChildren();
        
        this.timer = this.emitterData.delay || 0;
        this.playing = true;
        this.particlesRemaining = this.emitterData.amount;
    }

    /** Internal method - don't use*/
    addParticle() {
        var particleTemplate = this.emitterData.particleTemplate;
        if (particleTemplate.tint === undefined) particleTemplate.tint = 0xffffff;
        var position = spnr.v(0, 0);
        var size = spnr.v.random(particleTemplate.minSize,
            particleTemplate.maxSize);
        var timeToLive = spnr.randflt(particleTemplate.minTimeToLive,
            particleTemplate.maxTimeToLive);

        var angle = 0;
        var velocity = spnr.v(0, 0);
        switch (this.emitterData.shape) {
            case 'circle':
                angle = spnr.randflt(0, spnr.PI * 2);
                velocity = spnr.v(0, spnr.randflt(particleTemplate.minSpeed,
                    particleTemplate.maxSpeed));
                spnr.v.rotate(velocity, angle);
                break;
            case 'arc':
                angle = spnr.randflt(this.emitterData.minAngle, this.emitterData.maxAngle);
                velocity = spnr.v(0, spnr.randflt(particleTemplate.minSpeed,
                    particleTemplate.maxSpeed));
                spnr.v.rotate(velocity, angle);
                break;
            case 'line':
                void 0; // do nothing - line isn't planned yet
                break;
        }

        var particle = new spnr.GameEngine.Particle('particle', position, angle,
            particleTemplate.texture, size,
            velocity, timeToLive, particleTemplate.effectorStrengths);
        particle.setTint(particleTemplate.tint);
        this.particlesRemaining --;
        this.addChild(particle);

        // If effect is instantaneous, then don't wait for next frame
        if (this.emitterData.interval == 0 && this.particlesRemaining > 0) {
            this.addParticle();
        }
    }

    update() {
        if (this.playing) {
            // Everything in here is run in the nominal playing state
            if (this.particlesRemaining > 0) {
                this.timer -= spnr.GameEngine.deltaTime;
                if (this.timer < 0) {
                    this.addParticle();
                    this.timer = this.emitterData.interval;
                }
            }
            // Everything in here is run on the frame where playing finishes
            else {
                if (this.deleteWhenFinished) {
                    this.parent.removeChild(this);
                }

                // Make it loop
                if (this.looping) this.play()
                // Otherwise just quit
                else this.playing = false;
            }
        }
    }
}