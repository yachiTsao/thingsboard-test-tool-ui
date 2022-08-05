function AllDevicesJsonParse(allDeviceId) {
    return JSON.stringify({
        "deviceList": allDeviceId
    });
}
function deleteAllDevices(e) {
    e.preventDefault();
    e.stopPropagation();
    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/delete",
        method: "delete",
        dataType: "json",
        contentType: "application/json",
        data: AllDevicesJsonParse(allDeviceId),
        success: function (res) {
            alertBtn('已成功刪除資料', 'success');
        },
        error: function (data) {
            alertBtn('刪除資料失敗', 'danger');
        }
    });
}

function RPCJsonParse(allDeviceId) {
    return JSON.stringify({
        "deviceList": allDeviceId,
        "action": "subscribeRPC"
    });
}
function removeAllSubscribeRPC(allDeviceData, allDeviceId) {
    let isFindRPC = false;
    isFindRPC = allDeviceData.includes('subscribeRPC');
    if (isFindRPC === false) {
        alertBtn('全部裝置解除RPC訂閱失敗', 'danger');
    } else {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: RPCJsonParse(allDeviceId),
            success: function (res) {
                alertBtn('全部裝置成功解除RPC訂閱', 'success');
                loadDeviceList();
            },
            error: function (data) {
                alertBtn('全部裝置解除RPC訂閱失敗', 'danger');
            }
        });
    }
}

function SendDateJsonParse(allDeviceId) {
    return JSON.stringify({
        "deviceList": allDeviceId,
        "action": "sendData"
    });
}
function stopAllUploadData(allDeviceData, allDeviceId) {
    let isFindRPC = false;
    isFindRPC = allDeviceData.includes('sendData');
    if (isFindRPC === false) {
        alertBtn('全部裝置停止上傳資料失敗', 'danger')
    } else {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/action/stop",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: SendDateJsonParse(allDeviceId),
            success: function (res) {
                alertBtn('全部裝置成功停止上傳資料', 'success')
                loadDeviceList();
            },
            error: function (data) {
                alertBtn('全部裝置停止上傳資料失敗', 'danger')
                console.log(data);
            }
        });
    }
}

function buildData(data) {
    //title陣列
    const arrayData = [];
    // const arrayTitle = Object.keys(data[0]);
    // 利用mapping抓對照的值
    const CSVTitleMapping = getGlobalVariable('CSVTitleMapping');
    // 連接API的key
    const CSVTitleArray = Object.keys(CSVTitleMapping) || [];

    if (CSVTitleArray.length === 0) return;
    arrayData.push(Object.values(CSVTitleMapping));
    //key對照表的value值(要在CSV呈現的)

    for (let i = 0; i < data.length; i++) {
        const deviceItems = [];
        for (let j = 0; j < arrayData.length; j++) {
            let item = [];
            //利用key抓每個裝置的值
            CSVTitleArray.forEach((key) => {
                if (key === 'action') {
                    item.push(data[j][key].join(' & '));
                } else {
                    item.push(data[j][key] || '');
                }
            });
            deviceItems.push(item);
        }
        arrayData.push(deviceItems);
    }
    finArray = arrayData[data.length]
    // console.log(finArray);
    let csvData = '';
    csvData += arrayData[0] + '\n';
    for (let k = 0; k < finArray.length; k++) {
        let dataString = finArray[k].join(',') + '\n';
        csvData += dataString;
    }
    // console.log(csvData);
    return csvData;
}
function downloadCSV(csvContent) {
    // 下載的檔案名稱
    let fileName = '下載資料_' + (new Date()).getTime() + '.csv';

    // 建立一個 a，並點擊它
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
    link.setAttribute('download', fileName);
    link.click();
    alertBtn('已成功下載資料', 'success');
}
function downloadResult() {
    $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            let data = info.devices;
            // console.log(data);
            const result = buildData(data);
            if (!result) {
                alertBtn('資料轉換失敗', 'danger');
                return;
            }
            downloadCSV(result);
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
}