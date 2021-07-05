spnr.GameEngine.CircleCollider = class extends spnr.GameEngine.BaseCollider {
    constructor(name, localPosition, radius) {
        super(name, spnr.GameEngine.colliderTypes.circle, localPosition, 0);

        this.radius = radius;
    }

    isTouching(collider) {
        switch(collider.type) {
            case spnr.GameEngine.colliderTypes.circle:
                var distSq = spnr.v.distSq(this.globalPosition, collider.globalPosition);
                return (distSq < this.radius ** 2 + collider.radius ** 2);
        }
    }
}