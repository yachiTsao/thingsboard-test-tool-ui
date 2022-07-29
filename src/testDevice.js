function findArrayItem(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const result = arr.find(element => element === target);
    if (!result) return false;//arr.push(result);
    return true;
}
function buildItem(device, index) {
    let canLoadData = "No";
    const isSendData = findArrayItem(device.action, 'sendData');
    if (!device.action[0]) device.action[0] = ""; //sendData
    if (!device.action[1]) device.action[1] = ""; //subscribeRPC
    if (isSendData === true) canLoadData = "Yes";

    return `<tr><td> ${device.name} </td><td> ${device.type} </td><td> ${device.action[0]} <br> ${device.action[1]} </td>
    <td> ${device.testTime} </td><td> ${device.frequency} s </td><td> ${canLoadData} </td><td> ${device.testTime} </td>
    <td><button id="changeBtn-${index}" type="bottom" class="btn btn-outline-secondary"style="margin:10px;">編輯</button></td></tr>`
}
function buildSingleItem(device, index) {
    let canLoadData = "No";
    const isSendData = findArrayItem(device.action, 'sendData');
    if (!device.action[0]) device.action[0] = ""; //sendData
    if (!device.action[1]) device.action[1] = ""; //subscribeRPC
    if (isSendData === true) canLoadData = "Yes";

    return `<tr><td> ${device.name} </td><td> ${device.type} </td><td> ${device.action[0]} <br> ${device.action[1]} </td>
    <td> ${device.testTime} </td><td> ${device.frequency} s </td><td> ${canLoadData} </td></tr>`
}

function buildTableandFourButtonFunction(deviceList) {
    const tablePage = document.getElementById('test-device-data');
    let table = '';
    let ArrayofId = [];
    ArrayofId = [];
    // console.log(ArrayofId);
    for (let i = 0; i < deviceList.length; i++) {
        table += buildItem(deviceList[i],i);
        ArrayofId.push(deviceList[i].id);
    }
    tablePage.innerHTML = table;

    function AllDevicesJsonParse() {
        return JSON.stringify({
            "deviceList": ArrayofId
        });
    }
    // console.log(deviceList);

    const singlePage = document.getElementById('single-test-device');
    for(let k = 0; k < deviceList.length; k++){
        $(`#changeBtn-${k}`).on('click', changeSingleDevice =>{
            $('#single-device-list').show();
            $('#delete-Device').show();
            $('#remove-SubscribeRPC').show();
            $('#stop-UploadData').show();
            let singleTable = '';
            singleTable += buildSingleItem(deviceList[k],k);
            // console.log(singleTable);
            singlePage.innerHTML = singleTable;
            $(`#delete-Device`).on('click', deleteSingleDevice => {
                deleteDevices(deviceList[k].id);
            });
            $(`#remove-SubscribeRPC`).on('click', removeSingleSubscribeRPC => {
                removeSubscribeRPC(deviceList[k]);
            });
            $(`#stop-UploadData`).on('click', stopSingleUploadData =>{
                stopUploadData(deviceList[k]);
            });
        });
    }
    
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
                    // alert("已成功解除訂閱RPC");
                    loadDeviceList();
                    // console.log(res);
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
                    // alert("停止上傳資料成功");
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
    $(`#stop-allUploadData`).on('click', stopAllUploadData);


    // console.log(deviceList);
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
        console.log(finArray);
        let csvData = '';
        csvData += arrayData[0] + '\n';
        for (let k = 0; k < finArray.length; k++) {
            let dataString = finArray[k].join(',') + '\n';
            csvData += dataString;
        }
        console.log(csvData);
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
        alert('資料已下載');
    }
    function downloadResult() {
        $.ajax({
            url: 'http://10.204.16.106:9316/TB/device/action/list',
            type: "get",
            dataType: "json",
            success: function (info) {
                let data = info.devices;
                console.log(data);
                const result = buildData(data);
                if (!result) {
                    alert("資料轉換失敗");
                    return;
                }
                downloadCSV(result);
            },
            error: function (data) {
                console.log("請求失敗");
            }
        });
    }
    $(`#download-testResult`).on('click', downloadResult);
}
loadDeviceList()
// const sendActionData = document.getElementById();