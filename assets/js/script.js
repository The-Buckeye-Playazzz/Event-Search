// declaring variables
searchInputEl = document.getElementById("search-input");
searchButtonEl = document.getElementById("search-button");
resultsContainerEl = document.querySelector(".results-container");
weatherContainer = document.querySelector(".weather-container");             
var far;
var dscptn;


// function to display nearby events
function searchNearbyEvents() {
    ticketmasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + searchInputEl.value + "&sort=date,asc&apikey=FwyMEHGWc3ybkab0m3FG8jMPqqlKi5QP";

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
        })
}

// function to display weather
function displayWeather() {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&units=imperial&appid=2aa854b2e1b53a068dd2a8b6738c490f";

    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var far = data.main.temp;
        var temperature = document.createElement("p");
        temperature.textContent = "The Temperature Today is " + far + " deg's Farenheit";

        var dscptn = data.weather[0].description;
        var desc = document.createElement("p");
        desc.textContent ="With " + dscptn +", it feels like it's ";

        var feelsLike = data.main.feels_like;
        var flsLike = document.createElement("p");
        flsLike.textContent = feelsLike + " deg's Farenheit Outside";

        weatherContainer.appendChild(temperature);
        weatherContainer.appendChild(desc);
        weatherContainer.appendChild(flsLike);
    })
}

// event listener for when search button is pressed
searchButtonEl.addEventListener("click", function(event) {
    event.preventDefault();

    searchNearbyEvents();
    displayWeather();
});