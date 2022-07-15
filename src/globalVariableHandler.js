function initGlobalVariable() {
    window.global = {
        deviceList: [],
        isCreateDevice: false,
        // actionArray: [[]]
    };
}

function getGlobalVariable(target) {
    return window.global[target];
}

function setGlobalVariable(target, value) {
    window.global[target] = value;
}

$(document).ready(function () {
    initGlobalVariable();
})