spnr.KeyWatcher = class {
    constructor(elem=document) {
        this.elem = elem;

        this.keysDown = {};
        this.setupListeners();
    }

    setupListeners() {
        this.elem.addEventListener('keydown', event => {
            this.keysDown[event.code] = true;
        });
        this.elem.addEventListener('keyup', event => {
            this.keysDown[event.code] = false;
        });
    }

    keyIsDown(code) {
        if (this.keysDown[code] != undefined) return this.keysDown[code];
        else return false;
    }
}