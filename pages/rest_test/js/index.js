$(document).ready(function(){
	var ip;
	$.ajax({
		url: "../../ip/ip.txt",
		dataType: "text",
		success: function(data){
			ip = data;
			console.log(ip);
		},
		error: function(jqXHR, tS, error){
			ip = "error"
		},
		complete: function(){
			var api_url = "http://" + ip + "/products/api";
			console.log(api_url);
			$.ajax({
				type: "GET",
				dataType : "json",
				url: api_url,
				success: fillData,
				error: function(){
					$("#data").text("CONNECTION TIMED OUT");
				}
			});
		}
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

