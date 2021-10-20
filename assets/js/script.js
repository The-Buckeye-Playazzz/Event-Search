// declaring variables
searchInputEl = document.getElementById("search-input");
searchButtonEl = document.getElementById("search-button");
resultsContainerEl = document.querySelector(".results-container");
weatherContainer = document.querySelector(".weather-container");
var DBAPIKey = "d8b292d44e355a51cd5073ffcd942ffa";
var city = "columbus";
var cords = ["",""];               
 var far;
 var dscptn;


// defining primary function
function searchNearbyEvents() {
    ticketmasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + searchInputEl.value + "&apikey=FwyMEHGWc3ybkab0m3FG8jMPqqlKi5QP";
    weatherUrl = "api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=2aa854b2e1b53a068dd2a8b6738c490f";
    console.log(weatherUrl);

    fetch(ticketmasterUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data._embedded.events);
            for (var i = 0; i < data._embedded.events.length; i++) {
                var createName = document.createElement("h2");
                var createDate = document.createElement("p");
                var createTime = document.createElement("p");
                var createLink = document.createElement("a");

                createName.textContent = data._embedded.events[i].name;
                createDate.textContent = data._embedded.events[i].dates.start.localDate;
                createTime.textContent = data._embedded.events[i].dates.start.localTime;
                createLink.textContent = "Purchase tickets";
                createLink.href = data._embedded.events[i].url;

                createName.appendChild(createDate);
                createName.appendChild(createTime);
                createName.appendChild(createLink);
                resultsContainerEl.appendChild(createName);
            }
            for (var i = 0; i < data._embedded.events.length; i++) {
                var scheduledDate = data._embedded.events[i].dates.start.localDate;
                console.log(scheduledDate);
            }
        })

        function getLatLon() {

            var crdntsURL ="http://api.openweathermap.org/geo/1.0/direct?q=" + city + ",OH,US&limit=5&appid=" + DBAPIKey;
        
            fetch(crdntsURL).then(
                function(response){
                    return response.json();
                })
                .then(function (data) {
        
                    Lat = JSON.stringify(data[0].lat);
                    Lon = JSON.stringify(data[0].lon);
                    Lat = Lat.split("", 5);
                    Lon = Lon.split("", 6); 
                    Lat = Lat.join("");
                    Lon = Lon.join("");    
                    cords[0] = Lat;
                    cords[1] = Lon;      
                    console.log(cords);
                    getAPi();
                });
                
        }
        getLatLon();
        //console.log(cords);
        function getAPi() {

            console.log(cords[0]);
            console.log(cords[1]);
            var weatherAPIurl =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" + cords[0] + "&lon=" + cords[1] + "&units=imperial&exclude=minutely,hourly&appid=" + DBAPIKey;
            console.log(weatherAPIurl);
            fetch(weatherAPIurl).then(
                function(response){
                    return response.json();
        
                }
            )
            .then(function (data) {
                var far = data.current.temp;
                var temperature = document.createElement("p");
                temperature.textContent = "The Temperature Today is " + far + "deg's Farenheit";
                console.log(data.current.temp);
                var dscptn = data.current.weather[0].description;
                var desc = document.createElement("p");
                desc.textContent ="With " + dscptn +", it feels like it's ";
                console.log(data.current.weather[0].description);
                var feelsLike = data.current.feels_like;
                var flsLike = document.createElement("p");
                flsLike.textContent = feelsLike + "deg's Farenheit Outside";
                console.log(data.current.feels_like);
                console.log(far);
                console.log(dscptn);
                console.log(feelsLike);
                weatherContainer.appendChild(temperature);
                weatherContainer.appendChild(desc);
                weatherContainer.appendChild(flsLike);
        
            });

                

        }
        
        // getAPi();
        

}

// event listener for when search button is pressed
searchButtonEl.addEventListener("click", searchNearbyEvents);

var input = document.getElementById("search-input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search-button").click();
  }
});