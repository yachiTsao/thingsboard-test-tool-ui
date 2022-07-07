function updateAction() {
    if($("#subscribeRPC").attr("checked")!==undefined){
        console.log("true");}//勾選;
}
function updateActionSendData() {
    if($("#sendData").attr("checked","checked")){
        console.log("true");}//勾選
    else{
        console.log("false");
    }    
}
$(document).ready(async function () {
    // API 非同步操作
    const data = await $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            var tablePage = document.querySelector('#device-action-data');
            var table = '';
            for (i = 0; i < info.deviceList.length; i++) {
                table += "<tr><td>" + info.deviceList[i].name + "</td><td>" + info.deviceList[i].type + "</td>" +
                    "<td><input name=actionCheck[] id=subscribeRPC type=checkbox value=subscribeRPC checked=checked class=form-check-input on=updateAction()> subscribeRPC" + "</input><br>" +
                    "<input name=actionCheck[] id=sendData type=checkbox value=sendData class=form-check-input > sendData" + "</input></td>" +
                    "<td><input id=second class=form-control type=number value=12>" + "</input></td></tr>";
            }
            tablePage.innerHTML = table;
            // $("#sendData").one('click', updateActionSendData());
            // $("#sendData").addEventListener('click', function updateActionSendData() {
            //     if($("#sendData").attr("checked","checked")){
            //         console.log("true");}//勾選
            //     else{
            //         console.log("false");
            //     }    
            // });
            // if($("#subscribeRPC").attr("checked")!==undefined)
            // console.log("true");//勾選
            // if($("#sendData").attr("checked")===undefined)
            // console.log("false");//勾選
            var textVal = $("#second").val();
            console.log(textVal);
        },
        error: function (data) {
            console.log("請求失敗");
        }

    });
})