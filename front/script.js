const searchButton = document.getElementById("search-button");
const container = document.getElementById("forecast-container");
const favoriteButton = document.getElementById("add-favorite");
const favoriteList = document.getElementById("favorite-list")

import { search } from './js/client/api.js';
import { dataClean, addToFavorites } from './js/utils/helpers.js';
import { resetUI, displayError, dataDisplay, displayFavorites } from './ui/render.js';

async function getWeather() {
    let chosenCity = document.getElementById("city-input").value
    let url = `/meteo?ville=${chosenCity}`

    resetUI();
    let data = await search(url)

    if (data.cod != "200") {
        displayError();
    }
    else {
        let cleanData = dataClean(data)
        return dataDisplay(chosenCity, cleanData)
    }
}

searchButton.addEventListener('click', getWeather);

displayFavorites();

favoriteButton.addEventListener('click', () => {
    addToFavorites();
    displayFavorites();
});

favoriteList.addEventListener('click', (event) => {
    const cityName = event.target.textContent;
    document.getElementById("city-input").value = cityName
    getWeather();
});