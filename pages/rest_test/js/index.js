$(document).ready(function(){
	var ip;
	$.ajax({
		url: "ip/ip.txt",
		dataType: "json",
		success: function(data){
			ip = data.responseText;
		},
		error: function(jqXHR, tS, error){
			ip = "87.97.63.80";
		}

	});
	var api_url = "http://" + ip + "/products/api";
	console.log(api_url);
	$.ajax({
		type: "GET",
		dataType : "json",
		url: 'http://87.97.63.80/products/api',
		success: fillData
	});
});

function fillData(data){
	for(var i=0; i<30; ++i){
		var p = $('<p>');
		p.text(data[i].product_name);
		p.appendTo("#data");
	}
	/* $("#data").text(data[0].product_name);*/
}