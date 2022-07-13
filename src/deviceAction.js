// function updateRPC() {
//     var isChecked = $(this).is(":checked");
//     console.log("subscribeRPC: " + isChecked); //true or false
// };
// function updateSendData() {
//     var isChecked = $(this).is(":checked");
//     console.log("sendData: " + isChecked); //true or false
// };

// function parseActionData(dataset) {
//     const dataName = dataset.get('name');
//     const dataType = dataset.get('type');
//     const dataAction = dataset.getAll('actions');
//     const dataSecond = dataset.get('second');
//     // const jsonData = parseJson(actionData);
//     if (dataSecond) {
//         return JSON.stringify({
//             "name": dataName,
//             "type": dataType,
//             "action": dataAction,
//             "second": dataSecond
//         });
//     }
//     return;
// }

// function actionDataFormSubmit(event) {
//     event.preventDefault();
//     const inputData = $(event.target).serializeArray();
//     console.log(inputData);
//     const actionData = new FormData(event.target);
//     console.log(event.target.type);
//     console.log(actionData);
//     const newData = parseActionData(actionData);
//     console.log(newData);
//     const results = document.querySelector('.results pre');
//     results.innerText = JSON.stringify(formJSON, null, 2);
// }

// const actionDataForm = document.querySelector('#device-actionData-form');
// actionDataForm.addEventListener('submit', actionDataFormSubmit);


// console.log(isSubscribeRPC[1]);//undefined
// 搜尋action 
function findArrayItem(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const res1 = arr.find(element => element === target);
    if (!res1) return false;
    return true;
    // return arr.find(element => element === target) ? true : false; 
}

// sendData, subscribeRPC 
//create table and build items
function tableItemBuilder(device, index) {
    const isSendData = findArrayItem(device.action, 'sendData');
    const isSubscribeRPC = findArrayItem(device.action, 'subscribeRPC');
    // console.log(device.sendDataFrequency);
    return `<tr><td> ${device.name} </td><td> ${device.type} </td>
    <td><input name=actions id=subscribeRPC-${index} type=checkbox class=form-check-input ${isSubscribeRPC ? 'checked' : ''}> SubscribeRPC </input><br>
    <input name=actions id=sendData-${index} type=checkbox class=form-check-input ${isSendData ? 'checked' : ''}> SendData </input></td>
    <td><input name=second id=second-${index} class='form-control second' type=number value= ${device.sendDataFrequency} ></input></td></tr>`
}

function checkboxValue(e,i,target){
    e.target.value = e.target.checked;
    console.log(e.target.checked, e.target.value);

    if (e.target.checked === true) { //如果是true就加入(原本沒有)
        deviceList[i].action.push(target);
    } else { //不是sendData的留下(原本有)
        deviceList[i].action = deviceList[i].action.filter(element => element !== target);
    }
}

//更新Table
function updateTable(deviceList) {
    const tablePage = document.querySelector('#device-action-data'); //js寫法
    let table = '';
    for (let i = 0; i < deviceList.length; i++) {
        table += tableItemBuilder(deviceList[i], i);
        console.log(deviceList[i].action);
    }
    // console.log(deviceList.action);
    // $('#device-action-data').html(table);  //jQuery寫法
    tablePage.innerHTML = table; //js寫法

    

    for (let i = 0; i < deviceList.length; i++) {
        // const sendDataCallback = checkboxValue(e,i,'');
        function sendDataCallback (e) {
            e.target.value = e.target.checked;
            console.log(e.target.checked, e.target.value);
            
            if (e.target.checked === true) {
                deviceList[i].action.push('sendData');
            } else {//不是subscribeRPC(原本有)
                deviceList[i].action = deviceList[i].action.filter(element => element !== 'sendData');
            }
            console.log(deviceList);
        }
        $(`#sendData-${i}`).on('click', sendDataCallback); //sendDataCallback(e) = checkboxValue(e,i,'')(e)
        console.log(deviceList);

        function subscribeRPCCallback (e) {
            e.target.value = e.target.checked;
            console.log(e.target.checked, e.target.value);
            
            if (e.target.checked === true) {
                deviceList[i].action.push('subscribeRPC');
            } else {//不是subscribeRPC(原本有)
                deviceList[i].action = deviceList[i].action.filter(element => element !== 'subscribeRPC');
            }
            console.log(deviceList);
        }
        $(`#subscribeRPC-${i}`).on('click', subscribeRPCCallback); // subscribeRPCCallback(event)

        $(`#second-${i}`).on('change', (e) => {
            // console.log(e.target.value);
            deviceList[i].sendDataFrequency = parseInt(e.target.value);
            console.log(deviceList);
        });

    }
}
//連接API
async function fetchDeviceActionListAndUpdateTable() {
    const deviceActionList = await $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            // console.log(info);
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
    updateTable(deviceActionList.devices);
}

fetchDeviceActionListAndUpdateTable();