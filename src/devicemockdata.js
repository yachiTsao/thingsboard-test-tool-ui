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
function parseMockData(dataset) {
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
    const newData = parseMockData(data);

    if (newData) {
        linkCreateMockData(newData);
    }
}

const mockDataForm = document.querySelector('#device-mockData-form');
mockDataForm.addEventListener('submit', mockDataSubmit);