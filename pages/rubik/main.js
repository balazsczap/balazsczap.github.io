requirejs.config({
	baseUrl: "js/lib",
	paths:{
		app:'../app'
	}
});

requirejs(['three.min', 'app/rubik'],
function(THREE, rubik){


});