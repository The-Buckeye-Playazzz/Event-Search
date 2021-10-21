// declaring variables
searchInputEl = document.getElementById("search-input");
searchButtonEl = document.getElementById("search-button");
resultsContainerEl = document.querySelector(".results-container");
weatherContainerEl = document.querySelector(".weather-container");             


// function to display nearby events
function searchNearbyEvents() {
    var currentDate = moment().format("YYYY-MM-DD");
    var ticketmasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + searchInputEl.value + "&startDateTime=" + currentDate + "T00:00:00Z&sort=date,asc&apikey=FwyMEHGWc3ybkab0m3FG8jMPqqlKi5QP";

    fetch(ticketmasterUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // create and display current events
            for (var i = 0; i < data._embedded.events.length; i++) {
                var createName = document.createElement("h2");
                var createDate = document.createElement("p");
                var createTime = document.createElement("p");
                var createLink = document.createElement("a");

                createName.textContent = data._embedded.events[i].name;
                createDate.textContent = data._embedded.events[i].dates.start.localDate;
                createLink.textContent = "Purchase tickets";
                createLink.href = data._embedded.events[i].url;

                // formats time of event if there is one
                if (data._embedded.events[i].dates.start.localTime) {
                    createTime.textContent = moment(data._embedded.events[i].dates.start.localTime, "HH:mm:ss").format("hh:mm A"); 
                }

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

        // create and display current weather information
        var far = data.main.temp;
        var temperature = document.createElement("p");
        temperature.textContent = "The temperature today is " + far + " °F";

        var dscptn = data.weather[0].description;
        var desc = document.createElement("p");
        desc.textContent ="With " + dscptn +", it feels like it's ";

        var feelsLike = data.main.feels_like;
        var flsLike = document.createElement("p");
        flsLike.textContent = feelsLike + " °F outside.";

        weatherContainerEl.appendChild(temperature);
        weatherContainerEl.appendChild(desc);
        weatherContainerEl.appendChild(flsLike);
    })
}

// function to clear previous search upon a new search
function clearContent () {
    resultsContainerEl.innerHTML = "";
    weatherContainerEl.innerHTML = "";
}

// event listener for when search button is pressed
searchButtonEl.addEventListener("click", function(event) {
    event.preventDefault();

    clearContent();
    searchNearbyEvents();
    displayWeather();

});