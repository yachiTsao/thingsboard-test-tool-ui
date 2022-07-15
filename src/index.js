function removeAllLinkActiveClassName(params) {
    $('.nav-link').removeClass('active');
}

function hideAllSubpage(params) {
    $('.subpage').hide();
}

$(document).ready(async function () {
    // API 非同步操作 await

    // init subpage
    hideAllSubpage();
    $('#actionPage').show();

    $('#deviceList').on('click', function (e) {
        hideAllSubpage();
        $('#listPage').show();
        removeAllLinkActiveClassName();
        $('#deviceList').addClass('active');
        linkDeviceList();
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