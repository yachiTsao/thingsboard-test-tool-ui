function removeAllLinkActiveClassName(params) {
    $('.nav-link').removeClass('active');
}

function hideAllSubpage(params) {
    $('.subpage').hide();
}

$(document).ready(async function () {
    // API 非同步操作
    $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            $("#device-list-data").html(
                "<tr><td>" + info.deviceList[0].id + "</td><td>" + info.deviceList[0].name + "</td><td>" + info.deviceList[0].type + "</td></tr>" + info.deviceList[0].label + "</td></tr>" + info.deviceList[0].token + "</td></tr>" +
                "<tr><td>" + info.deviceList[1].id + "</td><td>" + info.deviceList[1].name + "</td><td>" + info.deviceList[1].type + "</td></tr>" + info.deviceList[1].label + "</td></tr>" + info.deviceList[1].token + "</td></tr>" +
                "<tr><td>" + info.deviceList[2].id + "</td><td>" + info.deviceList[2].name + "</td><td>" + info.deviceList[2].type + "</td></tr>" + info.deviceList[2].label + "</td></tr>" + info.deviceList[2].token + "</td></tr>"
            )
        },
        error: function (data) {
            console.log("請求失敗");
        }
    }).then(function (data) {
        console.log(data);
    });

    // init subpage
    hideAllSubpage();
    $('#page1').show();

    $('#nav1').on('click', function (e) {
        hideAllSubpage();
        removeAllLinkActiveClassName();
        $('#nav1').addClass('active');
        $('#page1').show();
    });

    $('#nav2').on('click', function (e) {
        hideAllSubpage();
        removeAllLinkActiveClassName();
        $('#nav2').addClass('active');
        $('#page2').show();
    });
});