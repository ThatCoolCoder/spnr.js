/**
 * Class to provide callbacks for mouse events and to allow querying of current mouse state
*/
spnr.MouseWatcher = class {
    /**
     * Create a new MouseWatcher
     * @param {Element} [elem=document] - Element to watch. Defaults to the whole document. 
     * @param {number} scale - Amount to scale the mouse position by. Mainly used in the game engine when a canvas is scaled.
     */
    constructor(elem=document, scale=1) {
        /**
         * Element to watch. Can be changed at any time although beware that things might be confused in the transition.
         * @type {Element}
         */
        this.elem = elem;
        /**
         * Amount to scale the mouse position by. Mainly used in the game engin when a canvas is scaled.
         * Can be changed at any time although beware that things might be confused in the transition.
         * @type {number}
         */
        this.scale = scale;

        /**
         * Current position of the mouse relative to this.elem and scaled by this.scale.
         * @type {Vector}
         * @readonly
         */
        this.position = spnr.v(0, 0);
        /**
         * Whether the pointer (mouse or touchscreen) is currently pressed on this.elem.
         * Recommended to use this over this.mouseDown or this.touchDown for general use cases.
         * @type {boolean}
         * @readonly
         */
        this.pointerDown = false;
        /**
         * Whether the mouse (only works on pc) is currently pressed on this.elem.
         * Recommended to use this.pointerDown instead for general use cases.
         * @type {boolean}
         * @readonly
         */
        this.mouseDown = false;
        /**
         * Whether the touchscreen (only works on mobile) is currently pressed on this.elem.
         * Recommended to use this.pointerDown instead for general use cases.
         * @type {boolean}
         * @readonly
         */
        this.touchDown = false;

        /**
         * FunctionGroup called when the mouse or touchscreen press is moved.
         * @type {FunctionGroup}
         */
        this.onMouseMove = new spnr.FunctionGroup();
        this.elem.addEventListener('mousemove', e => {
            var rect = e.target.getBoundingClientRect();
            this.position.x = (e.x - rect.left) / this.scale;
            this.position.y = (e.y - rect.top) / this.scale;
            this.onMouseMove.call(this.position, e);
        });
        
        /**
         * FunctionGroup called when the mouse (only works on pc) is pressed on this.elem.
         * @type {FunctionGroup}
         */
        this.onMouseDown = new spnr.FunctionGroup();
        this.elem.addEventListener('mousedown', e => {
            this.mouseDown = true;
            this.onMouseDown.call(this.position, e);
        });

        /**
         * FunctionGroup called when the mouse (only works on pc) is released on this.elem.
         * @type {FunctionGroup}
         */
        this.onMouseUp = new spnr.FunctionGroup();
        this.elem.addEventListener('mouseup', e => {
            this.mouseDown = false;
            this.onMouseUp.call(this.position, e);
        });

        /**
         * FunctionGroup called when the touchscreen (only works on mobile) is pressed on this.elem.
         * @type {FunctionGroup}
         */
        this.onTouchStart = new spnr.FunctionGroup();
        this.elem.addEventListener('touchstart', e => {
            this.touchDown = true;
            this.onTouchStart.call(this.position, e);
        });

        /**
         * FunctionGroup called when the touchscreen (only works on mobile) is released on this.elem.
         * @type {FunctionGroup}
         */
        this.onTouchEnd = new spnr.FunctionGroup();
        this.elem.addEventListener('touchend', e => {
            this.touchDown = false;
            this.onTouchEnd.call(this.position, e);
        });

        /**
         * FunctionGroup called when the mouse or touchscreen is pressed on this.elem.
         * @type {FunctionGroup}
         */
        this.onPointerDown = new spnr.FunctionGroup();
        this.elem.addEventListener('pointerdown', e => {
            this.pointerDown = true;
            this.onPointerDown.call(this.position, e);
        });

        /**
         * FunctionGroup called when the mouse or touchscreen is released on this.elem.
         * @type {FunctionGroup}
         */
        this.onPointerUp = new spnr.FunctionGroup();
        this.elem.addEventListener('pointerup', e => {
            this.pointerDown = false;
            this.onPointerUp.call(this.position, e);
        });
    }
}