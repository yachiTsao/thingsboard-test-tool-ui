const sendCreateDeviceAlertBtn = (message, type) => {
    const alertPlaceholder = document.getElementById('sendCreateDeviceAlert')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`
    ].join('')
    alertPlaceholder.append(wrapper);  

    setTimeout(() => wrapper.remove(), 1500);
}
$("#create-device-form").submit(function (event) {
    //清除預設
    event.preventDefault();
    //將資料整理成陣列
    const datas = $(this).serializeArray();
    // console.log(typeof(datas[0].value));
    if(datas[0].value === ''){
        sendCreateDeviceAlertBtn('新增資料失敗', 'danger');
    }
    else if(datas[1].value === ''){
        sendCreateDeviceAlertBtn('新增資料失敗', 'danger');
    }
    else if(datas[2].value === ''){
        sendCreateDeviceAlertBtn('新增資料失敗', 'danger');
    }
    else{
        linkCreateDeviceandParseJson(datas);
    }
});