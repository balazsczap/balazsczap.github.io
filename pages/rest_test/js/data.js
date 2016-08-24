var product_data;

$(document).ready(function(){
	var ip;
	loadLinks();
	setUpSorters();
	loadData("#data");
});

function loadData(data_placement){
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
				success: function(data){product_data = data; fillData(data, data_placement); $("#id_asc").trigger("click");},
				error: function(){
					$(data_placement).text("DB SZERVER NEM ELÉRHETŐ").attr("style", "width:100%;margin:auto;text-transform: uppercase;font-size: 40px; color:#f44336");
				}
			});
		}

	});
}

function fillData(data, data_placement){
	$(data_placement).find(".row:not(:first)").remove()
	for(var i=0; i<30; ++i){
		var row = document.createElement("div");

		var id = document.createElement("p");
		$(id).text(data[i].product_id).appendTo(row);

		var text = document.createElement("p");
		$(text).text(data[i].product_name).appendTo(row);

		var shelf_id = document.createElement("p");
		$(shelf_id).text(data[i].shelf_id).appendTo(row);

		$(row).attr("class", "row")
			.appendTo(data_placement);
	}
	/* $("#data").text(data[0].product_name);*/
}




