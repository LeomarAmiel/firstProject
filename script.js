var fah = document.getElementById("fah");
var cel = document.getElementById("cel");
var logo = document.getElementById("logo");
var temp = 0;

if(self.fetch){
	if('geolocation' in navigator){
	navigator.geolocation.getCurrentPosition(function(pos){
		fetch(' https://crossorigin.me/http://nominatim.openstreetmap.org/reverse?format=json&lat='+pos.coords.latitude+'&lon='+pos.coords.longitude)
			.then(function(resp){
				return resp.json()
					.then(function(jsonData){
						document.getElementById("location").innerHTML = jsonData.address.city + ', ' + jsonData.address.country;
						fetch('https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?APPID=92011e535f28a9ecdfe3bd444c349b9a&lat='+pos.coords.latitude+'&lon='+pos.coords.longitude)
							.then(function(resp){
								return resp.json()
								.then(function(jsonData){
									temp = jsonData.main.temp;
									document.getElementById("temp").innerHTML = Math.floor(temp - 273.15);
									switch (jsonData["weather"][0]["id"].toString().substring(0,1)) {
										case '2':
											logo.innerHTML = 'U';
											break;
										case '3':
											logo.innerHTML = 'X';
											break;
										case '5':
											logo.innerHTML = 'R';
											break;
										case '6':
											logo.innerHTML = 'W';
											break;
										case '8':
											if(jsonData["weather"][0]["id"]==800){
												logo.innerHTML = 'A'
											}
											else if(jsonData["weather"][0]["id"]==801){
												logo.innerHTML = 'D'
											}
											else{
												logo.innerHTML = 'O';	
											}
											break;
									}
								});
							});
					});
			});
	});
	}
	else{
		console.error("Geolocation is not supported on your browser. Update your browser");
	}
}
else{
	console.error("Fetch is not supported on your browser. Update your browser")
}

document.getElementById("fah").addEventListener('click', function(){
	fah.className = fah.className.replace(/inactive/g, 'active');
	cel.className = cel.className.replace(/active/g, 'inactive');
	document.getElementById("temp").innerHTML = Math.floor((temp * 1.8) - 459.67);
	
	
});
document.getElementById("cel").addEventListener('click', function(){
	cel.className = cel.className.replace(/inactive/g, 'active');
	fah.className = fah.className.replace(/active/g, 'inactive');
	document.getElementById("temp").innerHTML = Math.floor(temp - 273.15);
});