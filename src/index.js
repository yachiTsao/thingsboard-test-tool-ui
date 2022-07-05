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
                "<tr><td>" + info.deviceList[0].name + "</td><td>" + info.deviceList[0].type + "</td></tr>" +
                "<tr><td>" + info.deviceList[1].name + "</td><td>" + info.deviceList[1].type + "</td></tr>" +
                "<tr><td>" + info.deviceList[2].name + "</td><td>" + info.deviceList[2].type + "</td></tr>"
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
    $('#createpage').show();

    $('#devicelist').on('click', function (e) {
        hideAllSubpage();
        $('#listpage').show();
        removeAllLinkActiveClassName();
        $('#devicelist').addClass('active');
    });

    $('#devicecreate').on('click', function (e) {
        hideAllSubpage();
        $('#createpage').show();
        removeAllLinkActiveClassName();
        $('#devicecreate').addClass('active');

    });

    $('#nav3').on('click', function (e) {
        hideAllSubpage();
        $('#page3').show();
        removeAllLinkActiveClassName();
        $('#nav3').addClass('active');
    });

    $('#nav4').on('click', function (e) {
        hideAllSubpage();
        $('#page4').show();
        removeAllLinkActiveClassName();
        $('#nav4').addClass('active');
    });
});