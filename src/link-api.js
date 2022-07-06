$("#create-device-form").submit(function (event) {
    event.preventDefault();
    //將資料整理成陣列
    const datas = $(this).serializeArray();
    console.log(datas);

    //
    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/create",
        method: "post",
        //上傳json格式需加入以下兩行
        dataType: "json",
        contentType: "application/json",
        data: parseData(datas),
        success: function (res) {
            alert("已成功新增資料");
        },
        error: function (data) {
            alert("新增資料失敗");
        }
    });

});
//將資料轉為json格式
function parseData(data) {
    return JSON.stringify({
        //將deviceCount轉成數字格式
        "deviceCount": +(data[0].value),
        "deviceName": data[1].value,
        "deviceType": data[2].value
    });
}