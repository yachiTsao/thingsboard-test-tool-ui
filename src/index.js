function removeAllLinkActiveClassName(params) {
    $('.nav-link').removeClass('active');
}

function hideAllSubpage(params) {
    $('.subpage').hide();
}

function hideSingleDevice(){
    $('#single-device-list').hide();
    $('#delete-Device').hide();
    $('#remove-SubscribeRPC').hide();
    $('#stop-UploadData').hide();
}

$(document).ready(async function () {
    // API 非同步操作 await

    // init subpage
    hideAllSubpage();
    $('#testDevicePage').show();
    

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
        fetchDeviceActionListAndUpdateTable();
    });

    $('#TestDevice').on('click', function (e) {
        hideSingleDevice();
        hideAllSubpage();
        $('#testDevicePage').show();
        removeAllLinkActiveClassName();
        $('#TestDevice').addClass('active');
        loadDeviceList();
    });
});