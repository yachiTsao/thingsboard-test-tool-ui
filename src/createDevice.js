$("#create-device-form").submit(function (event) {
    //清除預設
    event.preventDefault();
    //將資料整理成陣列
    const datas = $(this).serializeArray();
    console.log(datas);
    linkCreateDeviceandParseJson(datas);   
});