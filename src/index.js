function removeAllLinkActiveClassName(params) {
    $('.nav-link').removeClass('active');
}

function hideAllSubpage(params) {
    $('.subpage').hide();
}

$(document).ready(async function () {
    // API 非同步操作
    const data = await $.ajax({
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
    });

    console.log(data);

    // init subpage
    hideAllSubpage();
    $('#mockdatapage').show();

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

    $('#devicemockdata').on('click', function (e) {
        hideAllSubpage();
        $('#mockdatapage').show();
        removeAllLinkActiveClassName();
        $('#devicemockdata').addClass('active');
    });

    $('#nav4').on('click', function (e) {
        hideAllSubpage();
        $('#page4').show();
        removeAllLinkActiveClassName();
        $('#nav4').addClass('active');
    });
});