spnr.NeuralNetwork = class {
    constructor() {
        this.inputs = [];
        this.hiddenLayers = [];
        this.outputs = [];
    }

    createInputLayer(size) {
        this.inputs = [];
        for (var i = 0; i < size; i ++) {
            this.inputs.push(new spnr.Neuron());
        }
    }

    addHiddenLayer(size) {
        var newLayer = [];
        for (var i = 0; i < size; i ++) {
            newLayer.push(new spnr.Neuron());
        }
        this.hiddenLayers.push(newLayer);
    }

    createOutputLayer(size) {
        this.outputs = [];
        for (var i = 0; i < size; i ++) {
            this.outputs.push(new spnr.Neuron());
        }
    }

    connect() {
        // connect input to first hidden
        this._connect2Layers(this.inputs, this.hiddenLayers[0]);
        // connect last hidden to output
        this._connect2Layers(this.hiddenLayers[this.hiddenLayers.length - 1], this.outputs);

        // connect hidden layers to each other
        for (var i = 0; i < this.hiddenLayers.length - 1; i ++) {
            var firstLayer = this.hiddenLayers[i];
            var secondLayer =  this.hiddenLayers[i + 1];
            this._connect2Layers(firstLayer, secondLayer);
        }
    }

    activate(input) {
        this.inputs.forEach((neuron, i) => neuron.activate(input[i]));
        this.hiddenLayers.forEach(layer => {
            layer.forEach(neuron => neuron.activate());
        });
        return this.outputs.map(neuron => neuron.activate());
    }

    train(dataset, iterations=1) {
        while(iterations > 0) {
            dataset.forEach(datum => {
                this.activate(datum.inputs);
                this.propagate(datum.outputs);
            });
            iterations--;
        }
    }

    propagate(target) {
        this.outputs.forEach((neuron, i) => neuron.propagate(target[i]));
        for (var i = this.hiddenLayers.length - 1; i >= 0; i --) {
            var layer = this.hiddenLayers[i];
            layer.forEach(neuron => neuron.propagate());
        }
        return this.inputs.forEach(neuron => neuron.propagate());
    }

    saveTraining() {
        var savedTraining = [];

        savedTraining.push(this._saveLayer(this.inputs));
        this.hiddenLayers.forEach(layer => {
            savedTraining.push(this._saveLayer(layer));
        });
        savedTraining.push(this._saveLayer(this.outputs));

        return savedTraining;
    }

    loadTraining(savedTraining) {
        this._loadLayer(savedTraining[0], this.inputs);
        this.hiddenLayers.forEach((layer, i) => {
            this._loadLayer(savedTraining[i + 1], layer);
        });
        this._loadLayer(savedTraining[this.hiddenLayers.length + 1], this.outputs);
    }

    _saveLayer(layer) {
        var savedLayer = [];
        layer.forEach(neuron => {
            var savedNeuron = [];
            savedNeuron.push(neuron.bias);

            var incomingWeights = Object.values(neuron.incoming.weights);
            savedNeuron.push(incomingWeights);
            var outgoingWeights = Object.values(neuron.outgoing.weights);
            savedNeuron.push(outgoingWeights);

            savedLayer.push(savedNeuron);
        });
        return savedLayer;
    }

    _loadLayer(savedLayer, neuronObjs) {
        for (var i = 0; i < neuronObjs.length; i ++) {
            var neuron = neuronObjs[i];
            var values = savedLayer[i];

            // set the bias (the first item in a saved neuron)
            neuron.bias = values.shift();
            
            // then set the weights of the connections
            setValues(neuron.incoming.weights, values[0]);
            setValues(neuron.outgoing.weights, values[1]);
        }
    }

    _connect2Layers(layer1, layer2) {
        layer1.forEach(neuron => {
            layer2.forEach(neuron2 => {
                neuron.connect(neuron2);
            });
        });
    }
}