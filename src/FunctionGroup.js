/**
 * A collection of functions that can be run together.
 * Technically the functions don't have to accept the same parameters,
 * but weird things may happen if they don't.
 * Useful for things like listeners and callbacks.
*/
spnr.FunctionGroup = class {
    /**
     * Create a new function group
     * @param {function[]} [o] f - Array of functions to initialise with
    */
    constructor(initialFunctions = []) {
        this.functions = new Set(initialFunctions);
    }

    /**
     * Add a function to the group
     * @param {function} f - function to add
    */
    add(f) {
        this.functions.add(f);
    }

    /**
     * Add an array of functions to the group
     * @param {function[]} functionArray - functions to add
    */
    addBulk(functionArray) {
        functionArray.forEach(f => this.add(f));
    }

    /**
     * Remove a function from the group 
     * @param {function} f - function to remove
    */
    remove(f) {
        return this.functions.delete(f);
    }

    /**
     * Remove all functions from the group */
    removeAll() {
        this.functions = [];
    }

    /**
     * Call all the functions in the group. Call with arguments that you want to be passed to the functions, eg fg.call(valueToPass) */
    call() {
        this.functions.forEach(f => {
            f(...arguments);
        });
    }
}