var product_data;
var store_data;
$(document).ready(function(){
	var ip;
	loadLinks();
	loadData("#shelves");
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
				url: api_url + "/store.json",
				success: function(data){
					store_data = data[0];
					setUpShelves(data_placement);
					$.ajax({
						type: "GET",
						dataType : "json",
						timeout:1000,
						url: api_url,
						success: function(data){product_data = data; fillShelves(data_placement)},
						error: function(){
							$(data_placement).text("DB SZERVER NEM ELÉRHETŐ").attr("style", "width:100%;margin:auto;text-transform: uppercase;font-size: 40px; color:#f44336");
						}
					});
				},
				error: function(){
					$(data_placement).text("DB SZERVER NEM ELÉRHETŐ").attr("style", "width:100%;margin:auto;text-transform: uppercase;font-size: 40px; color:#f44336");
				}
			});
		}

	});
}
var selectedShelves = [];

function setUpShelves(data_placement){
	var rows = store_data.rows;
	var columns = store_data.columns;
	for (var i = 0; i < rows; ++i) 
	{
		var row = $(document.createElement("div")).attr("class", "shelf_row").appendTo(data_placement);
		var shelf_width = row.width()/columns;
		for(var j=0; j<columns; ++j){

			var shelf = $(document.createElement("div"))
							.attr("class", "shelf")
							.attr("shelf_id", i*columns + j)
							.css("width", shelf_width)
							.css("min-height", shelf_width/2)
							.text(i*columns + j)
							.click(function(){
								selectedShelves.push(this);
							})
							.appendTo(row);

								


		}
	}
}

function fillShelves(data_placement){
	for(var i=0; i<product_data.length;++i){
		var product = $(document.createElement("div"))
							.attr("class", "product")
							.attr("shelf_id", i)
							.text(product_data[i].product_name);

		var shelf = $(".shelf[shelf_id="+ product_data[i].shelf_id + "]");
		product.appendTo(shelf);
	}
}