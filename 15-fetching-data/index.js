import { ready } from "../common/ready.js";

const OPEN_METEO_BASE_URL = "https://archive-api.open-meteo.com/v1/";
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

async function showDataForLocation(latitude, longitude) {
    const averageDailyTemps = await getHistoricalWeatherData({
        latitude,
        longitude
    });

    const div = document.querySelector("#myplot");
    div.textContent = "";

    const plot = Plot.plot({
        x: {tickFormat: Plot.formatMonth("en", "short"), label: "Date"},
        y: {grid: true, label: "Temp"},
        marks: [
            Plot.ruleY([0]),
            Plot.lineY(averageDailyTemps, {x: "time", y: "temperature_2m_max", stroke: "red", tip: {anchor: "bottom"}}),
            Plot.lineY(averageDailyTemps, {x: "time", y: "temperature_2m_min", stroke: "blue", tip: {anchor: "top"}})
        ]
    })

    div.append(plot);
}

function encode(text) {
    return encodeURIComponent(text);
}

async function getHistoricalWeatherData({
    latitude = "40.7143", longitude = "-74.006", 
    startDate = "2022-01-01", endDate="2022-12-31",
    dailyParameters=["temperature_2m_max", "temperature_2m_min"],
    units = {
        temperature: "fahrenheit",
        windspeed: "mph",
        precipitation: "inch"
    },
    timezone="America/New_York"
 } = {}) {
    const REQUEST_URL = `${OPEN_METEO_BASE_URL}archive?latitude=${encode(latitude)}&longitude=${encode(longitude)}&start_date=${encode(startDate)}&end_date=${encode(endDate)}&daily=${dailyParameters.join()}&temperature_unit=${encode(units.temperature)}&windspeed_unit=${encode(units.windspeed)}&precipitation_unit=${encode(units.precipitation)}&timezone=${encode(timezone)}`;

    /* docs:  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API */
    const response = await fetch(REQUEST_URL);
    if (response.ok) {
        const weatherData = await response.json();
        return weatherData.daily.time.map((time, idx) => {
            const data = { time: new Date(time) };
            dailyParameters.forEach(parameter => {
                data[parameter] = weatherData.daily[parameter][idx];
            });
            return data;
        });
    } else {
        throw new Error("Couldn't retrieve weather data.")
    }
}

const locations = [
    {place: "New York, NY", latitude: "40.7143", longitude: "-74.006"},
    {place: "Chicago, IL",  latitude: "41.85", longitude: "-87.65"},
    {place: "San Jose, CA", latitude: "37.3394", longitude: "-121.895"},
];

const locationSelector = document.querySelector("#location");
locations.forEach((location, idx) => {
    const option = document.createElement("option");
    option.textContent = location.place;
    option.dataset.longitude = location.longitude;
    option.dataset.latitude = location.latitude;
    option.value = idx;
    locationSelector.appendChild(option);
});

locationSelector.addEventListener("change", async (event) => {
    const target = event.target;
    const selectedLocation = Number(target.value);
    const latitude = locations[selectedLocation].latitude;
    const longitude = locations[selectedLocation].longitude;
    showDataForLocation(latitude, longitude);
});



ready(() => {
    showDataForLocation(locations[0].latitude, locations[0].longitude)
});