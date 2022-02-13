// Nested dictionary: testGroupName:(testName:function)
const tests = {};

class FailedAssertion extends Error {
    constructor(message) {
        super(message);
    }
}

function assert(value, message) {
    if (! value) throw FailedAssertion(message);
}
  