$(document).ready(async function () {
    // API 非同步操作
    const data = await $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/action/update',
        type: "get",
        dataType: "json",
        success: function (info) {
            $("#device-action-data").html(
                "<tr><td>" + info.deviceList[0].name + "</td><td>" + info.deviceList[0].type + "</td></tr>" +
                "<tr><td>" + info.deviceList[1].name + "</td><td>" + info.deviceList[1].type + "</td></tr>" +
                "<tr><td>" + info.deviceList[2].name + "</td><td>" + info.deviceList[2].type + "</td></tr>"
            )
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
})