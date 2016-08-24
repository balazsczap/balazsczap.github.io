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

	fillData(data, "#data");
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