function findArrayItem(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const result = arr.find(element => element === target);
    if (!result) return false;//arr.push(result);
    return true;
}
function buildItem(device) {
    let canLoadData = "No";
    const isSendData = findArrayItem(device.action, 'sendData');
    // const isSubscribeRPC = findArrayItem(device.action, 'subscribeRPC');
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
    // console.log(ArrayofId);
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

    // console.log(AllDevicesJsonParse(ArrayofId));
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
        let isFindRPC = false;
        isFindRPC = table.includes('subscribeRPC');
        if (isFindRPC === false) {
            alert("解除訂閱RPC失敗");
        } else {
            $.ajax({
                url: "http://10.204.16.106:9316/TB/device/action/stop",
                method: "post",
                dataType: "json",
                contentType: "application/json",
                data: RPCJsonParse(table),
                success: function (res) {
                    alert("已成功解除訂閱RPC");
                    console.log(res);
                },
                error: function (data) {
                    alert("解除訂閱RPC失敗");
                }
            });
        }
    }
    $(`#remove-allSubscribeRPC`).on('click', removeAllSubscribeRPC);


    function SendDateJsonParse() {
        return JSON.stringify({
            "deviceList": ArrayofId,
            "action": "sendData"
            // "canFindMockDataEntity": false
        });
    }
    function stopAllUploadData(e) {
        let isFindSendData = false;
        isFindSendData = table.includes('sendData');
        if (isFindSendData === false) {
            alert("停止上傳資料失敗");
        } else {
            $.ajax({
                url: "http://10.204.16.106:9316/TB/device/action/stop",
                method: "post",
                dataType: "json",
                contentType: "application/json",
                data: SendDateJsonParse(table),
                success: function (res) {
                    alert("停止上傳資料成功");
                    console.log(res);
                },
                error: function (data) {
                    alert("停止上傳資料失敗");
                }
            });
        }

    }
    $(`#stop-allUploadData`).on('click', stopAllUploadData);

    // console.log(deviceList);

    function downloadResult() {
        const buildData = data => {
            return new Promise((resolve, reject) => {
                // 最後所有的資料
                let arrayData = [];
                try {
                    // 取 data 的第一個 Object 的 key 當表頭
                    let arrayTitle = Object.keys(data[0]);
                    arrayData.push(arrayTitle);

                    // 取出每一個 Object 裡的 value，push 進新的 Array 裡
                    Array.prototype.forEach.call(data, d => {
                        let items = [];
                        Array.prototype.forEach.call(arrayTitle, title => {
                            let item = d[title] || '0';
                            console.log(title, item);
                            // items.push(item);
                            if (title === 'action') {
                                items.push(item.join(' & '));
                            } else {
                                items.push(item);
                            }
                        });
                        arrayData.push(items)
                    });
                    
                } catch (err) {
                    reject(err)
                }
                console.log(arrayData);
                resolve(arrayData);
            })
        }
        // 轉成 CSV 並下載
        const downloadCSV = data => {
            let csvContent = '';
            Array.prototype.forEach.call(data, d => {
                let dataString = d.join(',') + '\n';
                console.log(dataString, 'dataString');
                csvContent += dataString;
            })
            // console.log(csvContent);
            // 下載的檔案名稱
            let fileName = 'testDevice' + (new Date()).getTime() + '.csv';

            // 建立一個 a，並點擊它
            let link = document.createElement('a');
            link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
            link.setAttribute('download', fileName);
            link.click();
        }
        $.ajax({
            url: 'http://10.204.16.106:9316/TB/device/action/list',
            type: "get",
            dataType: "json",
            success: function (info) {
                let data = info.devices;
                buildData(data)
                    .then(data => downloadCSV(data));
            },
            error: function (data) {
                console.log("請求失敗");
            }
        });
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