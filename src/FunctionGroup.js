spnr.FunctionGroup = class {
    /** Warning! This is undocumented.
     * It is basically a collection of functions that can be run together
    */
    constructor(initialFunctions=[]) {
        this.functions = new Set(initialFunctions);
    }

    add(f) {
        this.functions.add(f);
    }

    addBulk(functionArray) {
        functionArray.forEach(f => this.add(f));
    }

    remove(f) {
        return this.functions.delete(f);
    }

    removeAll() {
        this.functions = [];
    }

    /** Call this with the arguments for the functions. */
    call() {
        this.functions.forEach(f => {
            f(...arguments);
        });
    }
}