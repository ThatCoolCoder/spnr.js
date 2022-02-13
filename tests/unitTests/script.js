const testSelector = spnr.dom.id('testSelector');
const outputArea = spnr.dom.id('output');

function setupTestSelector() {
    spnr.obj.keys(tests).forEach(key => {
        var option = document.createElement("option");
        option.value = key;
        option.text = key;
        testSelector.appendChild(option);
    })
}

function runTests() {
    outputArea.innerText = '';
    var selectedTestGroup = testSelector.value;
    var passCount = 0;
    var totalCount = 0;
    spnr.obj.keys(tests[selectedTestGroup]).forEach(testName => {
        totalCount ++;
        try {
            tests[selectedTestGroup][testName]();
            outputArea.innerText += `Passed test: ${testName}\n`;
            passCount ++;
        }
        catch (e) {
            if (e instanceof FailedAssertion) {
                outputArea.innerText += `Failed assertion in test: ${testName}\n` +
                                        `   ${e.message}\n` +
                                        `   ${e.stack}\n`
            }
            else {
                outputArea.innerText += `Failed test:\n` +
                                        `   ${e.message}\n` +
                                        `   ${e.stack}\n`
            }
        }
    });
    outputArea.innerText += `Passed ${passCount}/${totalCount} (${spnr.round(passCount / totalCount * 100, 2)})`;
}

setupTestSelector();