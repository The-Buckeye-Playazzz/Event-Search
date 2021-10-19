// declaring variables
searchInputEl = document.getElementById("search-input");
searchButtonEl = document.getElementById("search-button");
resultsContainerEl = document.querySelector(".results-container");

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