function linkCreateMockData(data) {
    $.ajax({
        url: "http://10.204.16.106:8888/TB/device/data/setting/create",
        method: "post",
        //上傳json格式需加入以下兩行
        dataType: "json",
        contentType: "application/json",
        data: data,
        success: function (res) {
            sendMockDataAlertBtn('已成功新增資料', 'success');
        },
        error: function (data) {
            sendMockDataAlertBtn('新增資料失敗', 'danger');
        }
    });
}

function linkCreateDeviceandParseJson(data) {
    //將資料轉為json格式
    function parseJsonString(data) {
        //將物件傳成字串
        return JSON.stringify({
            //將deviceCount轉成數字格式
            "deviceCount": +(data[0].value),
            "deviceName": data[1].value,
            "deviceType": data[2].value
        });
    }

    $.ajax({
        url: "http://10.204.16.106:8888/TB/device/create",
        method: "post",
        //上傳json格式需加入以下兩行
        dataType: "json",
        contentType: "application/json",
        data: parseJsonString(data),
        success: function (res) {
            sendCreateDeviceAlertBtn('已成功新增資料', 'success');
            //在windows中保存devicelist
            setGlobalVariable('deviceList', res)
        },
        error: function (data) {
            sendCreateDeviceAlertBtn('新增資料失敗', 'danger');
        }
    });
}

function linkDeviceList() {
    $.ajax({
        url: 'http://10.204.16.106:8888/TB/device/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            const tablePage = document.querySelector('#device-list-data');
            let table = '';
            for (i = 0; i < info.deviceList.length; i++) {
                table += "<tr><td>" + info.deviceList[i].name + "</td><td>" + info.deviceList[i].type + "</td></tr>";
            }
            tablePage.innerHTML = table;
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
}

function updateActionDeviceList(updateList) {
    function parseJsonString(updateList) {
        return JSON.stringify({
            "deviceList": updateList
        });
    }
    $.ajax({
        url: "http://10.204.16.106:8888/TB/device/action/update",
        method: "post",
        dataType: "json",
        contentType: "application/json",
        data: parseJsonString(updateList),
        success: function (res) {
            sendAlertBtn('已成功新增資料', 'success');
        },
        error: function (data) {
            sendAlertBtn('新增資料失敗', 'danger');
        }
    });
}

function fetchDeviceActionListAndUpdateTable() {
    $.ajax({
        url: 'http://10.204.16.106:8888/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            // setGlobalVariable("deviceActionList", info.devices);
            console.log(info.devices)
            //設定deviceActionList的內容
            reducer({
                action: window.actionList.deviceAction.updateDeviceActionList, 
                payload: info.devices
            })
            // console.log(getGlobalVariable("deviceActionList"));
            updateTable(getGlobalVariable("deviceActionList"));
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
}

function loadDeviceList() {
    $.ajax({
        url: 'http://10.204.16.106:8888/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            // console.log(info.devices);
            // buildAllDevicesTable(info.desvices);
            reducer({
                action: window.actionList.deviceAction.updateAllDeviceActionList, 
                payload: info.devices
            })
            buildAllDevicesTable(getGlobalVariable("allDeviceActionList"));
            console.log(getGlobalVariable("allDeviceActionList"));
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
}