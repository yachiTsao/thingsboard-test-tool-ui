const CSVTitleMapping = {
    name: 'device name',
    type: 'device type',
    action: 'device action',
    sendTimes: '傳送資料次數',
    testTime: '測試時間',
    frequency: '頻率'
};

function initGlobalVariable() {
    window.global = {
        deviceList: [],
        isCreateDevice: false,
        // 下載報表 key & display name完全對應
        // CSVTitleArray: ['name', 'type', 'action', 'sendTimes', 'testTime', 'frequency'],
        CSVTitleMapping,
        //flag 讓eventlistener只掛一次 不會重複掛
        setDeviceAction: false,
        singleDeviceAction: false,
        allDeviceAction: false
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