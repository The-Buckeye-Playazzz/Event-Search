// declaring variables
searchInputEl = document.getElementById("search-input");
searchButtonEl = document.getElementById("search-button");
resultsContainerEl = document.querySelectorAll(".results-container");

// defining primary function
function searchNearbyEvents() {
    console.log(searchInputEl.value);
    ticketmasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + searchInputEl.value + "&apikey=FwyMEHGWc3ybkab0m3FG8jMPqqlKi5QP";

    console.log(ticketmasterUrl);
    fetch(ticketmasterUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data._embedded.events);
            for (var i = 0; i < data._embedded.events.length; i++) {
                var createName = document.createElement("h2");

                createName.textContent = data._embedded.events[i].name;

                resultsContainerEl.append(createName);
            }
        })
}

// event listener for when search button is pressed
searchButtonEl.addEventListener("click", searchNearbyEvents);