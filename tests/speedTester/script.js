// git test

function testSpeed(func, samples) {
    var meanTime = 0;
    for (var i = 0; i < samples; i ++) {
        var start = performance.now();
        func();
        var end = performance.now()
        meanTime += end - start;
    }
    return meanTime / samples;
}

function run() {
    var codeToRun = spnr.dom.id('codeInput').value;
    localStorage.spnrTestCode = codeToRun;
    var func = eval('() => {' + codeToRun + ';}');
    var samples = spnr.dom.id('samplesInput').value;
    localStorage.spnrTestSamples = samples;
    var result = testSpeed(func, samples);
    spnr.dom.id('results').innerText = result + ' ms';
}

if (localStorage.spnrTestCode) {
    spnr.dom.id('codeInput').value = localStorage.spnrTestCode;
}

if (localStorage.spnrTestSamples) {
    spnr.dom.id('samplesInput').value = localStorage.spnrTestSamples;
}