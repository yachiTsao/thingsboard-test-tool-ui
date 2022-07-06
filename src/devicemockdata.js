function mockdatasubmit(event){
    event.preventDefault();
    //抓form裡面的資料
    const data = new FormData(event.target);
    // console.log(data);
    const value = Object.fromEntries(data.entries());
    const data1 = data.get('data');
    console.log(data1);
    console.log(typeof(data1));
    if(data1.search("\n")==true){
        console.log("y");
    }
    console.log({value});

    // JSON.parse();
}

const mockdataform = document.querySelector('#device-mockdata-form');
mockdataform.addEventListener('submit', mockdatasubmit);
// $("#create-device-form").submit(function (event) {
//     event.preventDefault();
//     //將資料整理成陣列
//     const datas = $(this).serializeArray();
//     console.log(datas);

//     $.ajax({
//         url: "http://10.204.16.106:9316/TB/device/data/setting/create",
//         method: "post",
//         //上傳json格式需加入以下兩行
//         dataType: "json",
//         contentType: "application/json",
//         data: parseData(datas),
//         success: function (res) {
//             alert("已成功新增資料");
//         },
//         error: function (data) {
//             alert("新增資料失敗");
//         }
//     });

// });
//將資料轉為json格式
// function parseData(data) {
//     return JSON.stringify({
//         "name": data[0].value,
//         "data": data[1].value,
//     });
// }