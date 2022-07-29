function deleteDevices(idData) {
    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/delete",
        method: "delete",
        dataType: "json",
        contentType: "application/json",
        data: idData,
        success: function (res) {
            alert("已成功刪除資料");
        },
        error: function (data) {
            alert("刪除資料失敗");
        }
    });
}

function RPCJsonParse(singleDeviceData) {
    return JSON.stringify({
        "deviceList": [singleDeviceData.id],
        "action": "subscribeRPC"
    });
}
function removeSubscribeRPC(singleDeviceData) {
    let isFindRPC = false;
    isFindRPC = singleDeviceData.action.includes('subscribeRPC');
    if (isFindRPC === false) {
        alert("解除訂閱RPC失敗");
    } else {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: RPCJsonParse(singleDeviceData),
            success: function (res) {
                alert("已成功解除訂閱RPC");
                loadDeviceList();
                // loadSingleDeviceList();
                // console.log(res);
            },
            error: function (data) {
                alert("解除訂閱RPC失敗");
            }
        });
    }
}
function SendDateJsonParse(singleDeviceData) {
    return JSON.stringify({
        "deviceList": [singleDeviceData.id],
        "action": "sendData"
    });
}
function stopUploadData(singleDeviceData) {
    let isFindSendData = false;
    isFindSendData = singleDeviceData.action.includes('sendData');
    if (isFindSendData === false) {
        alert("停止上傳資料失敗");
    } else {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: SendDateJsonParse(singleDeviceData),
            success: function (res) {
                alert("停止上傳資料成功");
                loadDeviceList();
                // console.log(res);
            },
            error: function (data) {
                alert("停止上傳資料失敗");
                console.log(data);
            }
        });
    }
}
// function loadSingleDeviceList() {
//     $.ajax({
//         url: 'http://10.204.16.106:9316/TB/device/action/list',
//         type: "get",
//         dataType: "json",
//         success: function (info) {
//             console.log(info.devices);
//             // reLoadSingleDevice(info.devices);
//         },
//         error: function (data) {
//             console.log("請求失敗");
//         }
//     });
// }