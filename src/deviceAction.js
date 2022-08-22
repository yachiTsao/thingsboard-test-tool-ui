const sendActionData = document.getElementById('send-deviceActionData');
const sendAlertBtn = (message, type) => {
    const alertPlaceholder = document.getElementById('sendDeviceActionAlert')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`
    ].join('')
    alertPlaceholder.append(wrapper);  

    setTimeout(() => wrapper.remove(), 1500);
}
// 搜尋action 從陣列搜尋
function findArrayItem(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const result = arr.find(element => element === target);
    if (!result) return false;
    return true;
}

// create table and build items
function tableItemBuilder(device, index) {
    //判斷陣列內是否有行為
    const isSendData = findArrayItem(device.action, 'sendData');
    const isSubscribeRPC = findArrayItem(device.action, 'subscribeRPC');
    // if(device.frequency === undefined)device.frequency = 60;
    return `<tr><td> ${device.name} </td><td> ${device.type} </td>
    <td><input name=actions id=subscribeRPC-${index} type=checkbox class=form-check-input ${isSubscribeRPC ? 'checked' : ''}> SubscribeRPC </input><br>
    <input name=actions id=sendData-${index} type=checkbox class=form-check-input ${isSendData ? 'checked' : ''}> SendData </input></td>
    <td><input name=second id=second-${index} class='form-control second' type=number value= ${device.frequency} ></input></td></tr>`
}

//更新Table
function updateTable(deviceList) {
    const tablePage = document.querySelector('#device-action-data');
    let table = '';
    for (let i = 0; i < deviceList.length; i++) {
        table += tableItemBuilder(deviceList[i], i);
    }
    //將表格填入網頁
    tablePage.innerHTML = table;

    for (let i = 0; i < deviceList.length; i++) {
        function sendDataCallback(e) {
            // 變更為正確狀態
            e.target.value = e.target.checked;
            // console.log(e.target.checked, e.target.value);

            if (e.target.checked === true) { //如果是true就加入(原本沒有)
                deviceList[i].action.push('sendData');
            } else {//不是sendData的留下(原本有 取消點選)
                deviceList[i].action = deviceList[i].action.filter(element => element !== 'sendData');
            }
        }
        $(`#sendData-${i}`).on('click', sendDataCallback);

        function subscribeRPCCallback(e) {
            e.target.value = e.target.checked;
            // console.log(e.target.checked, e.target.value);

            if (e.target.checked === true) {
                deviceList[i].action.push('subscribeRPC');
            } else {
                deviceList[i].action = deviceList[i].action.filter(element => element !== 'subscribeRPC');
            }
        }
        $(`#subscribeRPC-${i}`).on('click', subscribeRPCCallback);

        $(`#second-${i}`).on('change', (e) => {
            deviceList[i].frequency = parseInt(e.target.value);
        });
    }
    const setDeviceAction = getGlobalVariable('setDeviceAction');
    if(!setDeviceAction){
        sendActionData.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // console.log(sendActionData);
            // 每次都去抓新的資料，定義的範圍不會受到if限制
            const deviceActionList = getGlobalVariable("deviceActionList");
            if (deviceActionList) updateActionDeviceList(deviceActionList);
        });
        setGlobalVariable('setDeviceAction', true);
    }
}
