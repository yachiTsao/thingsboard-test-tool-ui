function findArrayItem(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const result = arr.find(element => element === target);
    if (!result) return false;//arr.push(result);
    return true;
}

function buildItem(device) {
    // console.log(device); //物件
    let canLoadData = "No";
    const isSendData = findArrayItem(device.action, 'sendData');
    if (!device.action[0]) device.action[0] = ""; //sendData
    if (!device.action[1]) device.action[1] = ""; //subscribeRPC
    if (isSendData === true) canLoadData = "Yes";

    return `<tr><td style=" display: none;"> ${device.id} </td><td> ${device.name} </td><td> ${device.type} </td><td> ${device.action[0]} <br> ${device.action[1]} </td>
    <td> ${device.testTime} </td><td> ${device.frequency} s </td><td> ${canLoadData} </td><td> ${device.testTime} </td></tr>`
}

function changeAllDeviceAction(allDeviceData, allDeviceId) {
    function AllDevicesJsonParse() {
        return JSON.stringify({
            "deviceList": allDeviceId
        });
    }

    function deleteAllDevices(e) {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/delete",
            method: "delete",
            dataType: "json",
            contentType: "application/json",
            data: AllDevicesJsonParse(allDeviceId),
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
            "deviceList": allDeviceId,
            "action": "subscribeRPC"
        });
    }
    function removeAllSubscribeRPC(e) {
        let isFindRPC = false;
        isFindRPC = allDeviceData.includes('subscribeRPC');
        if (isFindRPC === false) {
            alert("解除訂閱RPC失敗001");
        } else {
            $.ajax({
                url: "http://10.204.16.106:9316/TB/device/action/stop",
                method: "post",
                dataType: "json",
                contentType: "application/json",
                data: RPCJsonParse(allDeviceData),
                success: function (res) {
                    alert("已成功解除訂閱RPC");
                    // loadDeviceList();
                },
                error: function (data) {
                    alert("解除訂閱RPC失敗002");
                }
            });
        }
    }
    $(`#remove-allSubscribeRPC`).on('click', removeAllSubscribeRPC);


    function SendDateJsonParse() {
        return JSON.stringify({
            "deviceList": allDeviceId,
            "action": "sendData"
        });
    }
    function stopAllUploadData(e) {
        let isFindRPC = false;
        isFindRPC = allDeviceData.includes('sendData');
        if (isFindRPC === false) {
            alert("停止上傳資料失敗001");
        } else {
            $.ajax({
                url: "http://10.204.16.106:9316/TB/device/action/stop",
                method: "post",
                dataType: "json",
                contentType: "application/json",
                data: SendDateJsonParse(allDeviceData),
                success: function (res) {
                    alert("停止上傳資料成功");
                    // loadDeviceList();
                },
                error: function (data) {
                    alert("停止上傳資料失敗002");
                    console.log(data);
                }
            });
        }
    }
    $(`#stop-allUploadData`).on('click', stopAllUploadData);

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

function changeSingleDeviceAction(singlePage) {
    $(`#deleteDeviceBtn`).on('click', (e) => {
        const selectDevice = singlePage.querySelector('tr');
        deleteDevice(selectDevice.textContent.split(' '));
    });

    $(`#removeRPCBtn`).on('click', (e) => {
        e.stopPropagation();
        const selectDevice = singlePage.querySelector('tr');
        // console.log("select",selectDevice.textContent.includes('subscribeRPC'));
        if (selectDevice.textContent.includes('subscribeRPC') === false) return;
        removeSubscribeRPC(selectDevice.textContent.split(' '));
        initAllDevicesData();
    });

    $(`#stopUploadDataBtn`).on('click', (e) => {
        const selectDevice = singlePage.querySelector('tr');
        // console.log("select",selectDevice.textContent.includes('sendData'));
        if (selectDevice.textContent.includes('sendData') === false) return;
        stopUploadData(selectDevice.textContent.split(' '));
    });
}

function initAllDevicesData() {
    const allDevices = document.querySelectorAll('#test-device-data>tr');
    allDevices.forEach((element) => {
        $(element).onclick = false;
        console.log('成功解除');
    })
    loadDeviceList();
}

function buildSingleDeviceTable() {
    const singlePage = document.querySelector('#single-test-device');
    const allDevices = document.querySelectorAll('#test-device-data>tr');
    // console.log(allDevices);
    allDevices.forEach((element) => {
        $(element).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            let cloneElement = element.cloneNode(true);
            let newChild;
            if (singlePage.querySelector('tr') === null) {
                singlePage.appendChild(cloneElement);
                console.log("oldChild", singlePage.appendChild(cloneElement));
            }
            else {
                newChild = cloneElement;
                console.log("newChild", newChild);
                singlePage.replaceChild(newChild, singlePage.querySelector('tr'));
            }
            //點擊某台裝置之後再呈現三個按鈕
            $('#single-device-list').show();
            $('#deleteDeviceBtn').show();
            $('#removeRPCBtn').show();
            $('#stopUploadDataBtn').show();
        })
    })
    changeSingleDeviceAction(singlePage);
}

function buildAllDevicesTable(deviceList) {
    console.log("loadAllDevicesData")
    const tablePage = document.getElementById('test-device-data');
    let table = '';
    let ArrayofId = [];
    table = '';
    ArrayofId = [];
    for (let i = 0; i < deviceList.length; i++) {
        table += buildItem(deviceList[i], i);
        ArrayofId.push(deviceList[i].id);
    }
    tablePage.innerHTML = table;

    changeAllDeviceAction(table, ArrayofId);

    buildSingleDeviceTable();
}

async function loadDeviceList() {
    const loadDevicesData = await $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            // console.log(info.devices);
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
    buildAllDevicesTable(loadDevicesData.devices);
}