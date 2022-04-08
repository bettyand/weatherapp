const weather = {
    key: "09040523d49139cfae82b17a00c7ec08",

    startSearch: function () {
        this.getCoords(document.querySelector("#search-bar").value);
    },

    getCoords: function (zip) {
        fetch("http://api.openweathermap.org/geo/1.0/zip?zip=" + zip + ",US&appid=" + this.key)
        .then(response => response.json())
        .then(coords => this.getWeather(coords));
    },

    getWeather: function (coords) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.lon + "&units=imperial&appid=" + this.key)
        .then(response => response.json())
        .then(data => this.displayWeather(data));
    },

    displayWeather: function (data) {
        document.querySelector(".city").innerText = "Current Weather in " + data.name;
        document.querySelector(".temperature").innerText = data.main.temp + "°F";
        document.querySelector(".feels").innerText = "Feels Like " + data.main.feels_like + "°F";
        document.querySelector(".condition").innerText = data.weather[0].main;
        document.querySelector(".descrip").innerText = data.weather[0].description;
        document.querySelector(".low").innerText = "Low: " + data.main.temp_min + "°F";
        document.querySelector(".high").innerText = "High: " + data.main.temp_max + "°F";
        document.querySelector(".humid").innerText = data.main.humidity + "% Humidity";
        document.querySelector(".wind").innerText = data.wind.speed + "MPH Winds";
    }
}

const today = new Date();
const [month, day, year] = [today.toLocaleString("default", {month: "long"}), today.getDate(), today.getFullYear()];
document.querySelector(".date").innerHTML = `on ${month} ${day}, ${year}`;

document.querySelector("#button").addEventListener("click", function () {weather.startSearch()});
document.querySelector("#search-bar").addEventListener("keyup", function (event) {if (event.key =="Enter") {weather.startSearch();}})
