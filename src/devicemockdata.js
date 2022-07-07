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
    const Jsondata = jQuery.parseJSON(mockdata);
    console.log(Jsondata);
    return JSON.stringify({
        "name": mockdataname,
        "data": Jsondata,
    });
}
const mockdataform = document.querySelector('#device-mockdata-form');
mockdataform.addEventListener('submit', mockdatasubmit);