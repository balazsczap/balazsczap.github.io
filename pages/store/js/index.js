var product_data;

$(document).ready(function(){
	var ip;
	loadLinks();
	setUpSorters();
	$.ajax({
		url: "../../ip/ip.txt",
		dataType: "text",
		success: function(data){
			ip = data;
			// console.log(ip);
		},
		error: function(jqXHR, tS, error){
			ip = "error"
		},
		complete: function(){
			var api_url = "http://" + ip + "/products/api";
			// console.log(api_url);

			$.ajax({
				type: "GET",
				dataType : "json",
				timeout:1000,
				url: api_url,
				success: function(data){product_data = data; fillData(data); $("#id_asc").trigger("click");},
				error: function(){
					$("#data").text("DB SZERVER NEM ELÉRHETŐ").attr("style", "width:100%;margin:auto;text-transform: uppercase;font-size: 40px; color:#f44336");
				}
			});
		}

	});


});

function fillData(data){
	$("#data").find(".row:not(:first)").remove()
	for(var i=0; i<30; ++i){
		var row = document.createElement("div");
		var id = document.createElement("p");
		$(id).text(data[i].product_id).appendTo(row);

		var text = document.createElement("p");
		$(text).text(data[i].product_name).appendTo(row);
		$(row).attr("class", "row")
			.appendTo("#data");
	}
	/* $("#data").text(data[0].product_name);*/
}

function sortData(data, method, ascending = true){
	if(method==="id" && ascending == true){
		data.sort(function(a,b){
			a = a.product_id;
			b = b.product_id;
			return a < b ? -1 : a > b ? 1 : 0;
		});
	}

	else if(method==="id" && ascending == false){
		data.sort(function(a,b){
			a = a.product_id;
			b = b.product_id;
			return a < b ? 1 : a > b ? -1 : 0;
		});
	}
	else if (method=="name" && ascending == true){
		data.sort(function(a,b){
			a = a.product_name.toLowerCase();
			b = b.product_name.toLowerCase();
			return a < b ? -1 : a > b ? 1 : 0;
		});
	}
	else if (method=="name" && ascending == false){
		data.sort(function(a,b){
			a = a.product_name.toLowerCase();
			b = b.product_name.toLowerCase();
			return a < b ? 1 : a > b ? -1 : 0;
		});
	}

	fillData(data);
}

function loadLinks(){
	$.ajax({
		url: "../pages.json",
		dataType: "json",
		success: function(data){
			for(var i=0; i<data.length; ++i){
				var link = document.createElement("a");
				if(data[i].name === "REST próba"){
					$(link).text(data[i].name).attr("href", "#");
					$("#links").append(link);
				}
				else{
					$(link).text(data[i].name).attr("href", "../../" + data[i].url);
					$("#links").append(link);
				}
				
			}
		}
	});
}
var activeSorter;
function setUpSorters(){
	$("#id_asc").click(function(){
		if(!$(this).is(activeSorter)){
			sortData(product_data, "id", true);
			if(activeSorter!==undefined) switchActive(activeSorter);
			activeSorter = $("#id_asc").toggleClass("fa-arrow-circle-up fa-arrow-circle-o-up");
		}

	});
	$("#id_desc").click(function(){
		if(!$(this).is(activeSorter)){
			sortData(product_data, "id", false);
			if(activeSorter!==undefined) switchActive(activeSorter);
			activeSorter = $("#id_desc").toggleClass("fa-arrow-circle-down fa-arrow-circle-o-down");
		}
	});
	$("#name_asc").click(function(){
		if(!$(this).is(activeSorter)){
			sortData(product_data, "name", true);
			if(activeSorter!==undefined) switchActive(activeSorter);
			activeSorter = $("#name_asc").toggleClass("fa-arrow-circle-up fa-arrow-circle-o-up");
		}
	});
	$("#name_desc").click(function(){
		if(!$(this).is(activeSorter)){
			sortData(product_data, "name", false);
			if(activeSorter!==undefined) switchActive(activeSorter);
			activeSorter = $("#name_desc").toggleClass("fa-arrow-circle-down fa-arrow-circle-o-down");
		}
	});
}

function switchActive(active){
		// if(active.attr("asc") === "true"){
		if(active.attr("id").indexOf("asc") >= 0){
			active.toggleClass("fa-arrow-circle-up fa-arrow-circle-o-up");
		}
		else{
			active.toggleClass("fa-arrow-circle-down fa-arrow-circle-o-down");
		}
}