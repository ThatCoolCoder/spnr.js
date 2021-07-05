spnr.dom = {};

spnr.dom.logPara = undefined;

spnr.dom.id = function(id) {
    return document.getElementById(id);
}

spnr.dom.viewportWidth = function() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

spnr.dom.viewportHeight = function() { 
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

spnr.dom.viewportSize = function() {
    return spnr.v(spnr.dom.viewportWidth(), spnr.dom.viewportHeight());
}

spnr.dom.clearLogPara = function() {
    if (spnr.dom.logPara !== undefined) {
        spnr.dom.logPara.innerText = '';
    }
}

spnr.dom.logToPara = function(data, label='No label') {
    if (spnr.dom.logPara === undefined) {
        spnr.dom.logPara = document.createElement('p');
        document.body.appendChild(spnr.dom.logPara);
    }
    spnr.dom.logPara.innerText += `${label} : ${data}\n`;
}

spnr.dom.delete = function(id) {
    var elem = spnr.dom.id(id);
    if (elem != undefined) {
        elem.remove();
    }
}