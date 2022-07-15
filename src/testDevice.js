function findArrayItem(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const result = arr.find(element => element === target);
    if (!result) return false;//arr.push(result);
    return true;
}
function buildItem(device) {
    let canLoadData = "No";
    const isSendData = findArrayItem(device.action, 'sendData');
    const isSubscribeRPC = findArrayItem(device.action, 'subscribeRPC');
    if (!device.action[0]) device.action[0] = ""; //sendData
    if (!device.action[1]) device.action[1] = ""; //subscribeRPC
    if (isSendData === true) canLoadData = "Yes";
    return `<tr><td> ${device.name} </td><td> ${device.type} </td><td> ${device.action[0]} <br> ${device.action[1]} </td>
    <td> ${device.testTime} </td><td> ${device.frequency} s </td><td> ${canLoadData} </td><td> ${device.testTime} </td></tr>`
}

function buildTableandFourButtonFunction(deviceList) {
    const tablePage = document.getElementById('test-device-data');
    let table = '';
    let ArrayofId = [];
    ArrayofId = [];
    console.log(ArrayofId);
    for (let i = 0; i < deviceList.length; i++) {
        table += buildItem(deviceList[i]);
        ArrayofId.push(deviceList[i].id);
    }
    tablePage.innerHTML = table;
    // console.log(ArrayofId);

    function AllDevicesJsonParse() {
        return JSON.stringify({
            "deviceList": ArrayofId
        });
    }

    console.log(AllDevicesJsonParse(ArrayofId));
    function deleteAllDevices(e) {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/delete",
            method: "delete",
            dataType: "json",
            contentType: "application/json",
            data: AllDevicesJsonParse(ArrayofId),
            success: function (res) {
                alert("已成功刪除資料");
            },
            error: function (data) {
                alert("刪除資料失敗");
            }
        });
    }
    $(`#delete-allDevice`).on('click', deleteAllDevices);


    function RPCJsonParse() {
        return JSON.stringify({
            "deviceList": ArrayofId,
            "action": "subscribeRPC"
        });
    }
    function removeAllSubscribeRPC(e) {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: RPCJsonParse(table),
            success: function (res) {
                alert("已成功解除訂閱RPC");
            },
            error: function (data) {
                alert("解除訂閱RPC失敗");
            }
        });
    }
    $(`#remove-allSubscribeRPC`).on('click', removeAllSubscribeRPC);


    function SendDateJsonParse() {
        return JSON.stringify({
            "deviceList": ArrayofId,
            "action": "sendData",
            "canFindMockDataEntity": false
        });
    }
    function stopAllUploadData(e) {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: SendDateJsonParse(table),
            success: function (res) {
                alert("已成功停止上傳資料");
            },
            error: function (data) {
                alert("停止上傳資料失敗");
            }
        });
    }
    $(`#stop-allUploadData`).on('click', stopAllUploadData);

    // console.log(deviceList);
    function downloadResult() {
        //藉型別陣列建構的 blob 來建立 URL
        let fileName = "fileName.csv";
        const data = deviceList;
        let blob = new Blob([data], {
            type: "text/plain",
        });
        const href = URL.createObjectURL(blob);
        // 從 Blob 取出資料
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = href;
        link.download = fileName;
        link.click();

        // const a = document.createElement('a');
        // const url = window.URL.createObjectURL(blob);
        // const filename = 'downloadResult.txt';
        // a.href = url;
        // a.download = filename;
        // a.click(); window.URL.revokeObjectURL(url);
    }
    $(`#download-testResult`).on('click', downloadResult);

}

async function loadDeviceList() {
    const deviceActionList = await $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            buildTableandFourButtonFunction(info.devices);
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
}
loadDeviceList()