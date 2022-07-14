// 搜尋action 從陣列搜尋
function findArrayItem(arr, target) {
    // early return 先將不是陣列或陣列長度等於0的剔除
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const result = arr.find(element => element === target);
    if (!result) return false;
    return true;
    // 更簡化的寫法：return arr.find(element => element === target) ? true : false; (三元運算子 Ternary Operator)
}

// sendData, subscribeRPC 
// create table and build items
function tableItemBuilder(device, index) {
    //判斷陣列內是否有行為(boolean)
    const isSendData = findArrayItem(device.action, 'sendData');
    const isSubscribeRPC = findArrayItem(device.action, 'subscribeRPC');
    return `<tr><td> ${device.name} </td><td> ${device.type} </td>
    <td><input name=actions id=subscribeRPC-${index} type=checkbox class=form-check-input ${isSubscribeRPC ? 'checked' : ''}> SubscribeRPC </input><br>
    <input name=actions id=sendData-${index} type=checkbox class=form-check-input ${isSendData ? 'checked' : ''}> SendData </input></td>
    <td><input name=second id=second-${index} class='form-control second' type=number value= ${device.sendDataFrequency} ></input></td></tr>`
}

//更新Table
function updateTable(deviceList) {
    const tablePage = document.querySelector('#device-action-data'); //js寫法
    let table = '';
    for (let i = 0; i < deviceList.length; i++) {
        table += tableItemBuilder(deviceList[i], i);
    }
    //將表格填入網頁
    // $('#device-action-data').html(table);  //jQuery寫法
    tablePage.innerHTML = table; //js寫法

    for (let i = 0; i < deviceList.length; i++) {
        // const sendDataCallback = checkboxValue(e,i,'');
        // callback function 宣告 需透過另一個函式呼叫執行
        function sendDataCallback(e) {
            // 變更為正確狀態
            e.target.value = e.target.checked;
            console.log(e.target.checked, e.target.value);

            if (e.target.checked === true) { //如果是true就加入(原本沒有)
                deviceList[i].action.push('sendData');
            } else {//不是sendData的留下(原本有 取消點選)
                deviceList[i].action = deviceList[i].action.filter(element => element !== 'sendData');
            }
            // console.log(deviceList);
        }
        $(`#sendData-${i}`).on('click', sendDataCallback); //sendDataCallback(e) = checkboxValue(e,i,'')(e)
        // console.log(deviceList);

        function subscribeRPCCallback(e) {
            e.target.value = e.target.checked;
            console.log(e.target.checked, e.target.value);

            if (e.target.checked === true) {
                deviceList[i].action.push('subscribeRPC');
            } else {
                deviceList[i].action = deviceList[i].action.filter(element => element !== 'subscribeRPC');
            }
            // console.log(deviceList);
        }
        $(`#subscribeRPC-${i}`).on('click', subscribeRPCCallback); // subscribeRPCCallback(event)

        $(`#second-${i}`).on('change', (e) => {
            deviceList[i].sendDataFrequency = parseInt(e.target.value);
            // console.log(deviceList);
        });
    }
    console.log(deviceList);
    // updateActionDeviceList(deviceList);
}

// function deviceActionSubmit(event) {
//     event.preventDefault();
//     const list = new FormData(event.target);
//     console.log(list);
//     // if(list)updateActionDeviceList(list);
// }


//連接API
async function fetchDeviceActionListAndUpdateTable() {
    const deviceActionList = await $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            console.log(info);
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
    updateTable(deviceActionList.devices);
}

fetchDeviceActionListAndUpdateTable();