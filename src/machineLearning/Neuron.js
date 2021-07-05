spnr.Neuron = class {
    constructor(bias=spnr.randflt(-1, 1)) {
        this.id = spnr.uniqueId();
        this.bias = bias;

        this.incoming = {
            weights : {},
            targets : {}
        }

        this.outgoing = {
            weights : {},
            targets : {}
        }

        this._output;
        this.output;
        this.error;
    }
    
    connect(neuron, weight=spnr.randflt(0, 1)) {
        this.outgoing.targets[neuron.id] = neuron;
        neuron.incoming.targets[this.id] = this;
        neuron.incoming.weights[this.id] = weight;
        
        if (neuron.incoming.weights[this.id] == undefined) {
            this.outgoing.weights[neuron.id] = spnr.randflt(-1, 1);
        }
        else {
            this.outgoing.weights[neuron.id] = weight;
        }
    }

    activate(input) {
        if (input != undefined) {
            this._output = 1;
            this.output = input;
        }
        else {
            var targetIds = Object.keys(this.incoming.targets);
            var sum = targetIds.reduce((total, target) => {
                return total += this.incoming.targets[target].output * this.incoming.weights[target];
            }, this.bias);
            
            this._output = spnr.invSigmoid(sum);
            this.output = spnr.sigmoid(sum);
        }

        return this.output;
    }
    
    propagate(target, rate=0.3) {
        var outgoingIds = Object.keys(this.outgoing.targets);     
        
        if (target == undefined) {
            var sum = outgoingIds.reduce((total, target, index) => {
                var targetObj = this.outgoing.targets[target];
                this.outgoing.weights[target] -= rate * targetObj.error * this.output;
                this.outgoing.targets[target].incoming.weights[this.id] = this.outgoing.weights[target];
                
                total += targetObj.error * this.outgoing.weights[target];
                return total;
            }, 0);
        }
        else {
            var sum = this.output - target;
        }
        
        // 𝛿squash/𝛿sum
        this.error = sum * this._output
        
        // Δbias
        this.bias -= rate * this.error;
        
        return this.error;
    }
}