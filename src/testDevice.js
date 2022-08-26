const alertBtn = (message, type) => {
    const alertPlaceholder = document.getElementById('DeviceAlert')
    // const allDeviceActionAlert = document.getElementById('allDeviceAlert')

    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`
    ].join('')
    alertPlaceholder.append(wrapper);  

    setTimeout(() => wrapper.remove(), 1500);
}

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
    // if(device.frequency === undefined)device.frequency = 60;
    return `<tr><td style=" display: none;"> ${device.id} </td><td> ${device.name} </td><td> ${device.type} </td><td> ${device.action[0]} <br> ${device.action[1]} </td>
    <td> ${device.testTime} </td><td> ${device.frequency} s </td><td> ${canLoadData} </td><td> ${device.testTime} </td></tr>`
}

function changeAllDeviceAction(allDeviceData, allDeviceId) {
    const allDeviceAction = getGlobalVariable('allDeviceAction');
    if(!allDeviceAction){
        $(`#delete-allDevice`).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteAllDevices(allDeviceId);
            loadDeviceList();
        });

        $(`#remove-allSubscribeRPC`).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeAllSubscribeRPC(allDeviceData, allDeviceId);
            loadDeviceList();
        });

        $(`#stop-allUploadData`).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            stopAllUploadData(allDeviceData, allDeviceId);
            loadDeviceList();
        });
    
        $(`#download-testResult`).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            downloadResult();
            loadDeviceList();
        });
        setGlobalVariable('allDeviceAction', true);
    }
}

function changeSingleDeviceAction() {
    // find first device's content from single page
    const singlePage = $("#single-test-device");
    const singleDeviceAction = getGlobalVariable('singleDeviceAction');
    if (!singleDeviceAction) {
        
        $(`#deleteDeviceBtn`).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const selectDeviceText = singlePage[0].textContent;
            const selectContentArray = selectDeviceText.split(' ');
            deleteDevice(selectContentArray[1]);
            loadDeviceList();
        });

        $(`#removeRPCBtn`).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const selectDeviceText = singlePage[0].textContent;
            const selectContentArray = selectDeviceText.split(' ');
            // if (selectDeviceText.includes('subscribeRPC') === false) return;
            removeSubscribeRPC(selectContentArray);
            loadDeviceList();
        });

        $(`#stopUploadDataBtn`).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const selectDeviceText = singlePage[0].textContent;
            const selectContentArray = selectDeviceText.split(' ');
            // if (selectDeviceText.includes('sendData') === false) return;
            stopUploadData(selectContentArray);
            loadDeviceList();
        });
        setGlobalVariable('singleDeviceAction', true);
    }
}

function buildSingleDeviceTable() {
    const singlePage = document.querySelector('#single-test-device');
    const allDevices = document.querySelectorAll('#test-device-data>tr');
    allDevices.forEach((element) => {
        $(element).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            let cloneElement = element.cloneNode(true);
            let newChild;
            if (singlePage.querySelector('tr') === null) {
                singlePage.appendChild(cloneElement);
                // console.log("oldChild", singlePage.appendChild(cloneElement));

                //第一次進入先帶入singleDeviceActionList
                const chooseDeviceText = singlePage.textContent;
                const chooseContentArray = chooseDeviceText.split(' ');
                reducer({
                    action: window.actionList.deviceAction.updateSingleDeviceActionList, 
                    payload: chooseContentArray
                })
                // console.log("global singleDeviceActionList",getGlobalVariable("singleDeviceActionList"));
            }
            else {
                newChild = cloneElement;
                // console.log("newChild", newChild);
                //newchild 代替 oldchild(singlePage.querySelector('tr'))
                singlePage.replaceChild(newChild, singlePage.querySelector('tr'));

                //每次拿到換新的singleDevice就更新singleDeviceActionList
                const chooseDeviceText = singlePage.textContent;
                const chooseContentArray = chooseDeviceText.split(' ');
                reducer({
                    action: window.actionList.deviceAction.updateSingleDeviceActionList, 
                    payload: chooseContentArray
                })
                // console.log("global singleDeviceActionList",getGlobalVariable("singleDeviceActionList"));
            }
            //點擊某台裝置之後再呈現三個按鈕
            $('#single-device-list').show();
            $('#deleteDeviceBtn').show();
            $('#removeRPCBtn').show();
            $('#stopUploadDataBtn').show();
        })
    })
}

function buildAllDevicesTable(deviceList) {
    const tablePage = document.getElementById('test-device-data');
    // tablePage.innerHTML = '';
    let table = '';
    let ArrayofId = [];
    table = '';
    ArrayofId = [];
    for (let i = 0; i < deviceList.length; i++) {
        table += buildItem(deviceList[i], i);
        ArrayofId.push(deviceList[i].id);
    }
    tablePage.innerHTML = table;
    console.log(table);
    changeAllDeviceAction(table, ArrayofId);

    buildSingleDeviceTable();
}