const searchButton = document.getElementById("search-button");
const container = document.getElementById('forecast-container');

import { search } from './js/client/api.js';
import { dataClean } from './js/utils/helpers.js';
import { resetUI, displayError, dataDisplay } from './ui/render.js';

async function getWeather() {
    let chosenCity = document.getElementById("city-input").value
    let url = `/meteo?ville=${chosenCity}`

    resetUI();
    let data = await search(url)
    console.log(data)
    if (data.cod != "200") {
        displayError();
    }
    else {
        let cleanData = dataClean(data)
        return dataDisplay(chosenCity, cleanData)
    }
}

searchButton.addEventListener('click', getWeather)
