/*****
	This script sends the ip of the client (the dear reader) to the db server to allow access through the firewall, 
	thus disallowing any access that is not from shaat2.github.io.

	Ez a szkript elküldi a kliens (a kedves olvasó) ip-jét az adatbázis szervernek, hogy keresztülengedje a tűzfalon,
	így csak a shaat2.github.io-ról lehet lekérdezéseket tenni a szerver felé.

****/
function sendIP(){
	var ip;
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
			var ip_url = "http://" + ip + "/ip";
			$.ajax({
				type: 'POST',
				url: ip_url,
				data: "",
				dataType: 'text'
			})
		}

	});
}