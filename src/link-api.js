datas=$("form").serizlizeArray()
$.ajax({
	url:"http://10.204.16.106:9316/TB/device/create",
	method:"post",
	data:datas,  // data指定datas,剛剛抓出的資料（上面的陣列）
	success:function(res){
		console.log(res) // 接回成功後會有回傳值
}
})