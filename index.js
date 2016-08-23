$(function(){
	$.ajax({
		url: "pages/pages.json",
		dataType: "json",
		success: function(data){
			for(var i=0; i<data.length; ++i){
				var link = document.createElement("a");
				$(link).text(data[i].name).attr("href", data[i].url);
				$("#links").append(link);
			}
		}
	});
});