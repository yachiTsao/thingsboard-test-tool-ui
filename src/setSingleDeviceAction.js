function deleteDevice(idData) {
    return $.ajax({
        url: "http://10.204.16.106:9316/TB/device/delete",
        method: "delete",
        dataType: "json",
        contentType: "application/json",
        data: idData,
        success: function (res) {
            alertBtn('已成功刪除資料', 'success');
        },
        error: function (data) {
            alertBtn('刪除資料失敗', 'danger');
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
        alertBtn('單台裝置解除RPC訂閱失敗', 'danger');
        } else {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: RPCJsonParse(singleDeviceData),
            success: function (res) {
                console.log('已成功解除訂閱');
                alertBtn('單台裝置成功解除RPC訂閱', 'success');
                loadDeviceList();
            },
            error: function (data) {
                alertBtn('單台裝置解除RPC訂閱失敗', 'danger');            
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
        alertBtn('單台裝置停止上傳資料失敗', 'danger');
    } else {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: SendDateJsonParse(singleDeviceData),
            success: function (res) {
                console.log('已成功停止上傳');
                alertBtn('單台裝置成功停止上傳資料', 'success');
            },
            error: function (data) {
                alertBtn('單台裝置停止上傳資料失敗', 'danger');
            }
        });
    }
}
