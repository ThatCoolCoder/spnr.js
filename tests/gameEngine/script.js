class Car extends spnr.GameEngine.DrawableEntity {
    size = spnr.v(10, 30);

    topSpeed = 250;
    acceleration = 2;
    coastDeceleration = 0.5;
    brakeStrength = 2.5;

    steerSpeed = 0.0075;
    maxSteerAngle = 0.08;
    steerReturnSpeed = 0.004;
    steerInducedFriction = 0.5;

    glowColor = 0xccffcc;

    constructor(name, position, angle, texture) {
        super(name, position, angle, texture, spnr.v(1, 1));
        this.setTextureSize(this.size);

        this.steerAngle = 0;
        this.speed = 0;
        this.beingDragged = false;

        this.mouseDownCallbacks.add(() => {
            this.beingDragged = true;
        });

        this.mouseUpCallbacks.add(() => {
            this.beingDragged = false;
        });

        this.collider = new spnr.GameEngine.CircleCollider('car collider',
            spnr.v(0, 0), spnr.mean(this.textureSize.x, this.textureSize.y));
        this.addChild(this.collider);
    }

    brake(speed) {   
        if (this.speed > speed) {
            this.speed -= speed;
        }
        else if (this.speed < -speed) {
            this.speed += speed;
        }
        else this.speed = 0;
    }

    steer(angle) {
        var speedProportion = this.speed / this.topSpeed;
        var angleProportion = angle / this.maxSteerAngle;

        var trueAngle = angle * speedProportion;
        this.setLocalAngle(this.localAngle + trueAngle);
        
        var goalAccel = this.steerInducedFriction * spnr.abs(angleProportion); 
        this.speed -= goalAccel;
    }

    handleSpeed() {
        if (spnr.abs(this.speed) < this.topSpeed) {
            if (spnr.GameEngine.keyboard.keyIsDown('ArrowUp')) {
                this.speed += this.acceleration;
            }
            if (spnr.GameEngine.keyboard.keyIsDown('ArrowDown')) {
                this.speed -= this.acceleration;
            }
        }

        if (spnr.GameEngine.keyboard.keyIsDown('ShiftRight')) {
            this.brake(this.brakeStrength);
        }

        this.brake(this.coastDeceleration);
    }

    handleSteering() {
        if (spnr.abs(this.steerAngle) < this.maxSteerAngle) {
            if (spnr.GameEngine.keyboard.keyIsDown('ArrowLeft')) {
                this.steerAngle -= this.steerSpeed;
            }
            if (spnr.GameEngine.keyboard.keyIsDown('ArrowRight')) {
                this.steerAngle += this.steerSpeed;
            }
        }

        if (this.steerAngle > this.steerReturnSpeed) {
            this.steerAngle -= this.steerReturnSpeed;
        }
        else if (this.steerAngle < -this.steerReturnSpeed) {
            this.steerAngle += this.steerReturnSpeed;
        }
        else this.steerAngle = 0;

        this.steer(this.steerAngle);
    }

    move() {
        var dist = spnr.v(0, this.speed);
        spnr.v.rotate(dist, this.localAngle);
        spnr.v.mult(dist, 1 / 60);
        spnr.v.add(this.localPosition, dist);
    }

    collideObstacles() {
        var obstacles = spnr.GameEngine.getEntitiesWithTag('obstacle');
        obstacles.forEach(obstacle => {
            if (this.collider.isTouching(obstacle.collider)) {
                this.speed *= -0.5;
                this.move();
                obstacle.onCollide();
            }
        });
    }

    update() {
        this.handleSpeed();
        this.handleSteering();
        this.move();
        this.collideObstacles();

        if (this.mouseHovering) this.setTint(this.glowColor);
        else this.setTint(0xffffff);

        if (this.beingDragged) {
            this.setGlobalPosition(spnr.GameEngine.mouse.position);
            this.speed = 0;
            this.steerAngle = 0;
        }
    }
}

class Obstacle extends spnr.GameEngine.DrawableEntity {
    diameter = 20;

    constructor(position) {
        super('obstacle', position, 0, Obstacle.texture, spnr.v(0, 0));
        this.addTag('obstacle');

        this.setTextureSize(spnr.v(this.diameter, this.diameter));

        this.collider = new spnr.GameEngine.CircleCollider('obstacle collider',
            spnr.v(0, 0), this.diameter / 2);
        this.addChild(this.collider);

        this.collideNoise = Obstacle.collideNoise.copy();
    }

    onCollide() {
        this.collideNoise.play();
    }
}
Obstacle.texture = spnr.GameEngine.Texture.fromUrl('assets/obstacle.png');
Obstacle.collideNoise = new spnr.Sound('assets/bong.wav');

class AngleIndicator extends spnr.GameEngine.DrawableEntity {
    // An indicator which aligns itself with the angle of the trackedObject

    constructor(position, trackedObject, texture, size, rotationOffset=0) {
        super('positionArrow', position, 0, texture, size)
        this.trackedObject = trackedObject;
        this.rotationOffset = rotationOffset;
    }

    update() {
        this.setLocalAngle(this.trackedObject.globalAngle + this.rotationOffset);
    }
}

class PositionArrow extends spnr.GameEngine.DrawableEntity {
    // An arrow that appears when the trackedObject is out of limits
    // And points towards the trackedObject

    constructor(trackedObject, topLeftLimit, bottomRightLimit, texture, size) {
        super('position arrow', spnr.v(0, 0), 0, texture, size);

        // create a copy so that the texture size can be fiddled with
        this.size = spnr.v.copy(size);
        this.trackedObject = trackedObject;

        this.topLeftLimit = spnr.v.copy(topLeftLimit);
        this.bottomRightLimit = spnr.v.copy(bottomRightLimit);
    }

    trackedObjectInLimits() {
        var objPos = this.trackedObject.globalPosition;
        return (objPos.x > this.topLeftLimit.x &&
            objPos.x < this.bottomRightLimit.x &&
            objPos.y > this.topLeftLimit.y &&
            objPos.y < this.bottomRightLimit.y);
    }

    lineIntersection(pos1, pos2, pos3, pos4) {
        // returns intersection point of lines pos1>pos2, pos3>pos4
        // returns null if no intersecton

        var intersection = null;
        var den = (pos1.x - pos2.x) * (pos3.y - pos4.y) - (pos1.y - pos2.y) * (pos3.x - pos4.x);

        // if lines intersect (simple check)
        if (den != 0) {
            var t = ((pos1.x - pos3.x) * (pos3.y - pos4.y) - (pos1.y - pos3.y) * (pos3.x - pos4.x)) / den;
            var u = -((pos1.x - pos2.x) * (pos1.y - pos3.y) - (pos1.y - pos2.y) * (pos1.x - pos3.x)) / den;
            // if lines intersect (cpu intensive check)
            if (t > 0 && t < 1 && u > 0) {
                intersection = spnr.v(0, 0);
                intersection.x = pos1.x + t * (pos2.x - pos1.x);
                intersection.y = pos1.y + t * (pos2.y - pos1.y);
            }
        }
        return intersection
    }

    findArrowPos(middleOfBox, arrowHeading) {
        var topLeftCorner = spnr.v.copy(this.topLeftLimit);
        var topRightCorner = spnr.v(this.bottomRightLimit.x, this.topLeftLimit.y);
        var bottomRightCorner = spnr.v.copy(this.bottomRightLimit);
        var bottomLeftCorner = spnr.v(this.topLeftLimit.x, this.bottomRightLimit.y);

        var leftWallIntersection = this.lineIntersection(topLeftCorner, bottomLeftCorner,
            middleOfBox, this.trackedObject.globalPosition);
        var topWallIntersection = this.lineIntersection(topLeftCorner, topRightCorner,
            middleOfBox, this.trackedObject.globalPosition);
        var rightWallIntersection = this.lineIntersection(topRightCorner, bottomRightCorner,
            middleOfBox, this.trackedObject.globalPosition);
        var bottomWallIntersection = this.lineIntersection(bottomLeftCorner, bottomRightCorner,
            middleOfBox, this.trackedObject.globalPosition);
        
        var arrowPos;
        if (leftWallIntersection != null) arrowPos = leftWallIntersection;
        else if (topWallIntersection != null) arrowPos = topWallIntersection;
        else if (rightWallIntersection != null) arrowPos = rightWallIntersection;
        else if (bottomWallIntersection != null) arrowPos = bottomWallIntersection;
        
        var distToRemove = spnr.v(0, this.size.y / 2);
        spnr.v.rotate(distToRemove, arrowHeading);
        spnr.v.sub(arrowPos, distToRemove);

        return arrowPos;
    }

    update() {
        if (this.trackedObjectInLimits()) {
            this.setTextureSize(spnr.v(0, 0)); // hide texture
        }
        else {
            this.setTextureSize(this.size); // make texture visible

            var middleOfBox = spnr.v.mean(this.topLeftLimit, this.bottomRightLimit);
            var objPos = this.trackedObject.globalPosition;
            var displacement = spnr.v.copySub(objPos, middleOfBox);
            
            this.setGlobalAngle(spnr.v.heading(displacement) - spnr.PI / 2);
            this.setGlobalPosition(this.findArrowPos(middleOfBox, this.globalAngle));
        }
    }
}

class PlayScreen extends spnr.GameEngine.Scene {
    obstacleAmount = 10;

    constructor() {
        super('main scene',  spnr.v(0, 0), 0);

        this.createCar();
        this.createControls();
        this.createObstacles();
        this.createButtons();
    }

    createCar() {   
        var texture = spnr.GameEngine.Texture.fromUrl('assets/car.png');
        this.car = new Car('Vroomer', spnr.v(250, 250), 0, texture);
        this.addChild(this.car);
    }

    createControls() {
        this.controls = new spnr.GameEngine.Entity('controls', spnr.v(0, 0), 0);

        var pos = spnr.v.copySub(spnr.GameEngine.canvasSize, spnr.v(100, 100));
        var texture = spnr.GameEngine.Texture.fromUrl('assets/arrow.png');
        var angleIndicator = new AngleIndicator(pos, this.car, texture, spnr.v(5, 50));

        var texture = spnr.GameEngine.Texture.fromUrl('assets/arrow2.png');
        var positionArrow = new PositionArrow(this.car, spnr.v(0, 0),
            spnr.GameEngine.canvasSize, texture, spnr.v(25, 25));

        this.controls.addChild(angleIndicator);
        this.controls.addChild(positionArrow);
        this.addChild(this.controls);
    }

    createObstacles() {
        this.obstacles = [];
        spnr.doNTimes(this.obstacleAmount, () => {
            var pos = spnr.v.random(spnr.v(0, 0), spnr.GameEngine.canvasSize);
            var obstacle = new Obstacle(pos);
            this.obstacles.push(obstacle);
            this.addChild(obstacle);
        })
    }

    createButtons()  {
        var texture = spnr.GameEngine.Texture.fromUrl('assets/back.png');
        this.backButton = new spnr.GameEngine.Button('Back Button', spnr.v(70, 40), spnr.PI,
            spnr.v(120, 40), texture);
        this.backButton.mouseDownCallbacks.add(() => spnr.GameEngine.selectScene(menuScreen));
        this.addChild(this.backButton);
    }
}

class MenuScreen extends spnr.GameEngine.Scene {
    constructor() {
        super('Menu Scene', spnr.v(0, 0), 0);
        this.bg = new spnr.GameEngine.DrawableEntity('Menu bg', spnr.v.copyDiv(spnr.GameEngine.canvasSize, 2), 0,
            PIXI.Texture.WHITE, spnr.GameEngine.canvasSize);
        this.bg.sprite.tint = 0x000000;
        this.addChild(this.bg);
        
        var texture = spnr.GameEngine.Texture.fromUrl('assets/play.png');
        this.playButton = new spnr.GameEngine.Button('Play Button',
            spnr.v(spnr.GameEngine.canvasSize.x / 2, 100), spnr.PI,
            spnr.v(140, 40), PIXI.Texture.WHITE, 'Play', {fill: 0x000000});
        this.playButton.setTint(0xff0000);

        this.playButton.mouseDownCallbacks.add(() => spnr.GameEngine.selectScene(playScreen));
        this.addChild(this.playButton);
    }
}

// Basic setup
// -----------

spnr.GameEngine.init(spnr.v(spnr.dom.viewportWidth() * 0.9, spnr.dom.viewportHeight() * 0.9), 1, 0x3ca538);

var playScreen = new PlayScreen();
var menuScreen = new MenuScreen();

spnr.GameEngine.selectScene(menuScreen);
