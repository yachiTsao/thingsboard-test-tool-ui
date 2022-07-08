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
            "data": dataType,
            "action": dataAction,
            "second": dataSecond
        });
    }
    return;
}

function actionDataFormSubmit(event) {
  event.preventDefault();
  
  const actionData = new FormData(event.target);
  console.log(actionData);
  const newData = parseActionData(actionData);
  console.log(newData);


//   const results = document.querySelector('.results pre');
//   results.innerText = JSON.stringify(formJSON, null, 2);
}

const actionDataForm = document.querySelector('#device-actionData-form');
actionDataForm.addEventListener('submit', actionDataFormSubmit);

$(document).ready(async function () {
    // API 非同步操作
    const data = await $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            var tablePage = document.querySelector('#device-action-data'); //js寫法
            var table = '';
            for (i = 0; i < info.deviceList.length; i++) {
                table += "<tr><td>" + info.deviceList[i].name + "</td><td>" + info.deviceList[i].type + "</td>" +
                    "<td><input name=actions id=subscribeRPC type=checkbox value=subscribeRPC class='form-check-input subscribeRPC'> subscribeRPC" + "</input><br>" +
                    "<input name=actions id=sendData type=checkbox value=sendData class='form-check-input sendData'  checked=checked> sendData" + "</input></td>" +
                    "<td><input name=second id=second class='form-control second' type=number value=12>" + "</input></td></tr>";
            }
            // $('#device-action-data').html(table);  //jQuery寫法
            tablePage.innerHTML = table; //js寫法

            // $(".subscribeRPC").click(updateRPC);
            // $(".sendData").click(updateSendData);

            // $(".second").bind("input propertyChange", function (event) {
            //     console.log(event.target.value);
            // });

        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
})