// object containing all my weather retrieval functions
const weather = {
    // my API key
    key: "09040523d49139cfae82b17a00c7ec08",

    // send zip code from search bar into geocoding function
    startSearch: function () {
        this.getCoords(document.querySelector("#search-bar").value);
    },

    // get geocoding info
    getCoords: function (zip) {
        fetch("https://api.openweathermap.org/geo/1.0/zip?zip=" + zip + ",US&appid=" + this.key)
        .then(response => response.json())
        .then(coords => this.getWeather(coords))
    },

    // use geocodeing object to get current weather
    getWeather: function (coords) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.lon + "&units=imperial&appid=" + this.key)
        .then(response => response.json())
        .then(data => this.displayWeather(data));
    },

    // display current weather on the page
    displayWeather: function (data) {
        document.querySelector(".city").innerText = "Current Weather in " + data.name;
        document.querySelector(".temperature").innerText = Math.round(data.main.temp) + "°F";
        document.querySelector(".feels").innerText = "Feels Like " + Math.round(data.main.feels_like) + "°F";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        document.querySelector(".condition").innerText = data.weather[0].main;
        document.querySelector(".low").innerText = "Low: " + Math.round(data.main.temp_min) + "°F";
        document.querySelector(".high").innerText = "High: " + Math.round(data.main.temp_max) + "°F";
        document.querySelector(".humid").innerText = Math.round(data.main.humidity) + "% Humidity";
        document.querySelector(".wind").innerText = Math.round(data.wind.speed) + " MPH Winds";
    }
}

//display day, date and time
const today = new Date();
const [day, month, date, year, hour, minute] = [today.getDay(), today.toLocaleString("default", {month: "long"}), today.getDate(), today.getFullYear(), today.getHours(), today.getMinutes()];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function formatTime () {
    if (hour === 0) {
        return `12:${minute} AM`
    } else if (hour <= 12) {
        return `${hour}:${minute} AM`
    } else if (hour > 12) {
        let hourpm = hour - 12;
        return `${hourpm}:${minute} PM`
    }
}
document.querySelector(".date").innerHTML = `on ${weekdays[day]}, ${month} ${date}, ${year} at ${formatTime()}`;

// add event listeners to trigger API calls
document.querySelector("#button").addEventListener("click", function () {weather.startSearch()});
document.querySelector("#search-bar").addEventListener("keyup", function (event) {if (event.key == "Enter") {weather.startSearch();}})

// set default zip on page load
weather.getCoords(28205);
