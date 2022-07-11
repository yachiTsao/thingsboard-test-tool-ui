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
            var tablePage = document.querySelector('#device-list-data');
            var table = '';
            for (i = 0; i < info.deviceList.length; i++) {
                table += "<tr><td>" + info.deviceList[i].name + "</td><td>" + info.deviceList[i].type + "</td></tr>";
            }
            tablePage.innerHTML = table;
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });

    // console.log(data);

    // init subpage
    hideAllSubpage();
    $('#actionPage').show();

    $('#deviceList').on('click', function (e) {
        hideAllSubpage();
        $('#listPage').show();
        removeAllLinkActiveClassName();
        $('#deviceList').addClass('active');
    });

    $('#deviceCreate').on('click', function (e) {
        hideAllSubpage();
        $('#createPage').show();
        removeAllLinkActiveClassName();
        $('#deviceCreate').addClass('active');

    });

    $('#deviceMockData').on('click', function (e) {
        hideAllSubpage();
        $('#mockDataPage').show();
        removeAllLinkActiveClassName();
        $('#deviceMockData').addClass('active');
    });

    $('#deviceAction').on('click', function (e) {
        hideAllSubpage();
        $('#actionPage').show();
        removeAllLinkActiveClassName();
        $('#deviceAction').addClass('active');
    });
});