$("#create-device-form").submit(function (event) {
    event.preventDefault();

    const datas = $(this).serializeArray();
    console.log(datas);

    // console.log(parseData(datas));
    $.ajax({
        url: "http://10.204.16.106:9316/TB/device/create",
        method: "post",
        dataType: "json",
        contentType: "application/json",
        data: parseData(datas),
        success: function (res) {
            console.log(res);
        }
    });

});

function parseData(data) {
    // const newObj = {
    //     deviceCount: +(data[0].value)
    // };
    return JSON.stringify({
        "deviceCount": +(data[0].value),
        "deviceName": data[1].value,
        "deviceType": data[2].value
    });
}

var datas = $(this).serializeArray();

// const newObj = {
//     deviceCount: +(datas[0].value),
//     deviceName: "TB-tools2",
//     deviceType: "ggg"
// };


// $("#send-create-device").on('click', function (e) {
//     e.preventDefault();
//     console.log($("#create-device-form"));
//     datas = $("#create-device-form").serizlizeArray();
//     console.log(datas);
// })