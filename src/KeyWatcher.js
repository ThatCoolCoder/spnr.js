/**
 * A currently very basic class that keeps track of what keys are currently pressed 
 */
spnr.KeyWatcher = class {
    /**
     * Create a new KeyWatcher
     * @param {Element} [elem=document] elem - Element to watch. Defaults to whole document. 
     */
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

    /**
     * Check whether a key is down
     * @param {string} code - key.code of the key to be checked
     * @returns {boolean}
     */
    keyIsDown(code) {
        if (this.keysDown[code] != undefined) return this.keysDown[code];
        else return false;
    }
}