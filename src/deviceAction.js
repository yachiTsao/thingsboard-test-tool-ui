// function updateRPC() {
//     var isChecked = $(this).is(":checked");
//     console.log("subscribeRPC: " + isChecked); //true or false
// };
// function updateSendData() {
//     var isChecked = $(this).is(":checked");
//     console.log("sendData: " + isChecked); //true or false
// };

function parseActionData(dataset) {
    const dataName = dataset.get('name');
    const dataType = dataset.get('type');
    const dataAction = dataset.getAll('actions');
    const dataSecond = dataset.get('second');
    // const jsonData = parseJson(actionData);
    if (dataSecond) {
        return JSON.stringify({
            "name": dataName,
            "type": dataType,
            "action": dataAction,
            "second": dataSecond
        });
    }
    return;
}

function actionDataFormSubmit(event) {
    event.preventDefault();

    const inputData = $(event.target).serializeArray();
    console.log(inputData);
    const actionData = new FormData(event.target);
    // console.log(event.target.type);
    console.log(actionData);
    const newData = parseActionData(actionData);
    console.log(newData);


    //   const results = document.querySelector('.results pre');
    //   results.innerText = JSON.stringify(formJSON, null, 2);
}

const actionDataForm = document.querySelector('#device-actionData-form');
actionDataForm.addEventListener('submit', actionDataFormSubmit);

function findArrayItem(arr, targe) {
    if (Array.isArray(arr)) {
        arr.find();
    }
    return;
}

// sendData, subscribeRPC 
//create table and build items
function tableItemBuilder(device, index) {
    return "<tr><td>" + device.name + "</td><td>" + device.type + "</td>"`
    "<td><input name=actions id=subscribeRPC-${index} type=checkbox value='false' class='form-check-input subscribeRPC'> subscribeRPC </input><br>"`
    `<input name=actions id=sendData-${index} type=checkbox value='true' class='form-check-input sendData'  checked=checked> sendData </input></td>`
    `"<td><input name=second id=second-${index} class='form-control second' type=number value=12>" + "</input></td></tr>"`;
}

function updateTable(deviceList) {
    const tablePage = document.querySelector('#device-action-data'); //js寫法
    let table = '';
    for (i = 0; i < deviceList.length; i++) {
        table += tableItemBuilder(deviceList[i], i);
    }
    // $('#device-action-data').html(table);  //jQuery寫法
    tablePage.innerHTML = table; //js寫法

    for (i = 0; i < deviceList.length; i++) {
        $(`#sendData-${i}`).on('click', (e) => {
            e.target.value = e.target.checked;
            console.log(e.target.checked, e.target.value);
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
            console.log(info);
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
    updateTable(deviceActionList.deviceList);
}

// $(document).ready(async function () {
//     const deviceList = getGlobalVariable('deviceList');
//     // API 非同步操作
//     const data = await $.ajax({
//         url: 'http://10.204.16.106:9316/TB/device/list',
//         type: "get",
//         dataType: "json",
//         success: function (info) {
//             const tablePage = document.querySelector('#device-action-data'); //js寫法
//             let table = '';
//             for (i = 0; i < info.deviceList.length; i++) {
//                 table += tableItemBuilder(info.deviceList[i], i);
//             }
//             // $('#device-action-data').html(table);  //jQuery寫法
//             tablePage.innerHTML = table; //js寫法
            
//             for (i = 0; i < info.deviceList.length; i++) {
//                 $(`#sendData-${i}`).on('click', (e) => {
//                     e.target.value = e.target.checked;
//                     console.log(e.target.checked, e.target.value);
//                 });
//             }

//             // $(".subscribeRPC").click(updateRPC);
//             // $(".sendData").click(updateSendData);

//             // $(".second").bind("input propertyChange", function (event) {
//             //     console.log(event.target.value);
//             // });

//         },
//         error: function (data) {
//             console.log("請求失敗");
//         }
//     });
//     // $("#sendData-0").on('click', (e) => {
//     //     console.log(e.target.checked);
//     //     e.target.value = e.target.checked;
//     // });
//     console.log(data);
// });