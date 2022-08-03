function deleteDevice(idData) {
    return $.ajax({
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
        "deviceList": [singleDeviceData[1]],
        "action": "subscribeRPC"
    });
}
function removeSubscribeRPC(singleDeviceData) {
    let isFindRPC = false;
    isFindRPC = singleDeviceData.includes('subscribeRPC');
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
            },
            error: function (data) {
                alert("解除訂閱RPC失敗");
            }
        });
    }
}

function SendDateJsonParse(singleDeviceData) {
    return JSON.stringify({
        "deviceList": [singleDeviceData[1]],
        "action": "sendData"
    });
}
function stopUploadData(singleDeviceData) {
    let isFindSendData = false;
    isFindSendData = singleDeviceData.includes('sendData');
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
                loadDeviceList(true);
            },
            error: function (data) {
                alert("停止上傳資料失敗");
                console.log(data);
            }
        });
    }
}
