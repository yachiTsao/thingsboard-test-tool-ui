//測試輸入文字是否為json格式
function parseJson(str) {
    //先把非法的可能性排除
    if (typeof str !== 'string') return;
    try {
        //將字串轉為Json格式
        const parse = JSON.parse(str);
        //array object 皆為 object 
        if (typeof parse !== "object") return;
        return parse;
    } catch (e) {
        alert("請輸入合法Json格式");
        //回傳空值
        return;
    }
}
//將資料以json格式組合
function parseData(dataset) {
    const mockDataName = dataset.get('name');
    const mockData = dataset.get('data');
    const JsonData = parseJson(mockData);
    if (JsonData) {
        return JSON.stringify({
            "name": mockDataName,
            "data": JsonData,
        });
    }
    return;
}

function mockDataSubmit(event) {
    //清除預設
    event.preventDefault();
    //抓form裡面的資料
    const data = new FormData(event.target);
    //若觸發一次parseData()就會跑一次alert 以此類堆
    const newData = parseData(data);

    if (newData) {
        $.ajax({
            url: "http://10.204.16.106:9316/TB/device/data/setting/create",
            method: "post",
            //上傳json格式需加入以下兩行
            dataType: "json",
            contentType: "application/json",
            data: newData,
            success: function (res) {
                alert("已成功新增資料");
            },
            error: function (data) {
                alert("新增資料失敗");
            }
        });
    }
}

const mockDataForm = document.querySelector('#device-mockData-form');
mockDataForm.addEventListener('submit', mockDataSubmit);