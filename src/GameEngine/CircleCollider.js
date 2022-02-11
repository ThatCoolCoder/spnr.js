/**
 * Circular collider type. Currently the only collider implemented
 * @class
 */
spnr.GameEngine.CircleCollider = class extends spnr.GameEngine.BaseCollider {
    /**
     * Create a new collider
     * @param {string} name 
     * @param {spnr.Vector} localPosition 
     * @param {number} radius 
     */
    constructor(name, localPosition, radius) {
        super(name, spnr.GameEngine.colliderTypes.circle, localPosition, 0);

        this.radius = radius;
    }

    /**
     * Currently the only collision method implemented.
     * @param {spnr.GameEngine.BaseCollider} collider 
     * @returns {boolean}
     */
    isTouching(collider) {
        switch(collider.type) {
            case spnr.GameEngine.colliderTypes.circle:
                var distSq = spnr.v.distSq(this.globalPosition, collider.globalPosition);
                return (distSq < this.radius ** 2 + collider.radius ** 2);
        }
    }
}