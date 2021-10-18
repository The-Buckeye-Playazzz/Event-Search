
// declaring variables
searchInputEl = document.getElementById("search-input");
searchButtonEl = document.getElementById("search-button");

// defining primary function
function searchNearbyEvents() {
    console.log(searchInputEl.value);
    ticketmasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + searchInputEl.value + "&apikey=FwyMEHGWc3ybkab0m3FG8jMPqqlKi5QP";

    console.log(ticketmasterUrl)
}

// event listener for when search button is pressed
searchButtonEl.addEventListener("click", searchNearbyEvents);