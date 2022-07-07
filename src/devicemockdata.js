function mockdatasubmit(event) {
    //清除預設
    event.preventDefault();
    //抓form裡面的資料
    const data = new FormData(event.target);
    console.log(parseData(data));

    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/data/setting/create",
        method: "post",
        //上傳json格式需加入以下兩行
        dataType: "json",
        contentType: "application/json",
        data: parseData(data),
        success: function (res) {
            alert("已成功新增資料");
        },
        error: function (data) {
            alert("新增資料失敗");
        }
    });
}
//將資料轉為json格式
function parseData(dataset) {
    const mockdataname = dataset.get('name');
    const mockdata = dataset.get('data');
    const isJsondata = isJson(mockdata);
    console.log(isJsondata);
    const Jsondata = jQuery.parseJSON(mockdata);
    console.log(isJsondata);
    return JSON.stringify({
        "name": mockdataname,
        "data": Jsondata,
    });
}
//測試輸入文字是否為json格式
function isJson(str) {
    if (typeof str == 'string') {
        try {
            if (typeof JSON.parse(str) == "object") {
                return str;
            }
        } catch (e) {
            alert("請輸入Json格式");
            throw Error("This isn't json.");
        }
    }
}
const mockdataform = document.querySelector('#device-mockdata-form');
mockdataform.addEventListener('submit', mockdatasubmit);