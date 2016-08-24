$(function(){
	loadLinks();
});

function loadLinks(){
	$.ajax({
		url: "pages/pages.json",
		dataType: "json",
		success: function(data){
			for(var i=0; i<data.length; ++i){
				var link = document.createElement("a");
				if(data[i].name === "Home"){
					$(link).text(data[i].name).attr("href", "#");
					$("#links").append(link);
				}
				else{
					$(link).text(data[i].name).attr("href", data[i].url);
					$("#links").append(link);
				}
				
			}
		}
	});
}