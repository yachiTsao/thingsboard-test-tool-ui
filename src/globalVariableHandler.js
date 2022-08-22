const CSVTitleMapping = {
    name: 'device name',
    type: 'device type',
    action: 'device action',
    sendTimes: '傳送資料次數',
    testTime: '測試時間',
    frequency: '頻率'
};

let initState = {
    deviceList: [],
    deviceActionList: [],
    allDeviceActionList: [],
    // allDeviceActionId: [],
    singleDeviceActionList: [],
    isCreateDevice: false,
    // 下載報表 key & display name完全對應
    // CSVTitleArray: ['name', 'type', 'action', 'sendTimes', 'testTime', 'frequency'],
    CSVTitleMapping,
    //flag 讓eventlistener只掛一次 不會重複掛
    setDeviceAction: false,
    singleDeviceAction: false,
    allDeviceAction: false
};

const actionList = {
    deviceAction: {
        updateDeviceActionList: 'update device action list',
        updateAllDeviceActionList: 'update all device action list',
        updateSingleDeviceActionList: 'update single device action list',
    }
}

function reducer({ action, payload }) {
    console.log({ action, payload });
    switch (action) {
        case 'update device action list':
            initState = {
                ...initState,
                deviceActionList: payload,
                // devicePage: {
                //     deviceList: payload
                // }
            }
        case 'update single device action list':
            initState = {
                ...initState,
                singleDeviceActionList: payload,
            }
        case 'update all device action list':
            initState = {
                ...initState,
                allDeviceActionList: payload,
            }
        default:
            initState = initState;
    }
}

// function initGlobalVariable() {
//     window.global = initState;
// }

// function getDevicePageVariable(target) {
//     return initState.devicePage[target];
// }

// function setDevicePageVariable(target, value) {
//     return initState.devicePage[target] = value;
// }

function getGlobalVariable(target) {
    return initState[target];
}

function setGlobalVariable(target, value) {
    initState[target] = value;
}

$(document).ready(function () {
    // initGlobalVariable();
    window.actionList = actionList;
})