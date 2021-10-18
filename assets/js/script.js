ticketmasterApi = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=FwyMEHGWc3ybkab0m3FG8jMPqqlKi5QP"

// declaring variables
searchInputEl = document.getElementById("search-input");
searchButtonEl = document.getElementById("search-button");

// event listener for when search button is pressed
searchButtonEl.addEventListener("click", function() {
    console.log("button was pressed");
});