function linkCreateMockData(data) {
    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/data/setting/create",
        method: "post",
        //上傳json格式需加入以下兩行
        dataType: "json",
        contentType: "application/json",
        data: data,
        success: function (res) {
            alert("已成功新增資料");
        },
        error: function (data) {
            alert("新增資料失敗");
        }
    });
}

function linkCreateDeviceandParseJson(data) {
    //將資料轉為json格式
    function parseJsonString(data) {
        //將物件傳成字串
        return JSON.stringify({
            //將deviceCount轉成數字格式
            "deviceCount": +(data[0].value),
            "deviceName": data[1].value,
            "deviceType": data[2].value
        });
    }

    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/create",
        method: "post",
        //上傳json格式需加入以下兩行
        dataType: "json",
        contentType: "application/json",
        data: parseJsonString(data),
        success: function (res) {
            alert("已成功新增資料");
            setGlobalVariable('deviceList', res)
        },
        error: function (data) {
            alert("新增資料失敗");
        }
    });
}

function linkDeviceList() {
    $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            const tablePage = document.querySelector('#device-list-data');
            let table = '';
            for (i = 0; i < info.deviceList.length; i++) {
                table += "<tr><td>" + info.deviceList[i].name + "</td><td>" + info.deviceList[i].type + "</td></tr>";
            }
            tablePage.innerHTML = table;
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
}

function updateActionDeviceList(updateList) {
    function parseJsonString(updateList) {
        return JSON.stringify({
            "deviceList": updateList
        });
    }
    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/action/update",
        method: "post",
        dataType: "json",
        contentType: "application/json",
        data: parseJsonString(updateList),
        success: function (res) {
            alert("已成功新增資料");
        },
        error: function (data) {
            alert("新增資料失敗");
        }
    });
} 

function loadDeviceList() {
    const deviceActionList = $.ajax({
        url: 'http://10.204.16.106:9316/TB/device/action/list',
        type: "get",
        dataType: "json",
        success: function (info) {
            // console.log(info.devices);
            buildTableandFourButtonFunction(info.devices);
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
}