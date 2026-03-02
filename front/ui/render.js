import { getDay, getMoment } from '../js/utils/helpers.js';
const container = document.getElementById('forecast-container');

export function resetUI() {
    document.getElementById('forecast-container').style.display = 'none';
    document.getElementById('forecast-container').style.animation = 'none';
    document.getElementById('city').style.display = 'none';
    document.getElementById('forecast-container').style.animation = 'none';
}

export function displayError() {
    document.getElementById('city').innerHTML = "Introuvable, vérifiez l'orthographe.";
    document.getElementById('city').style.display = 'block';
    document.getElementById('city').style.animation = 'apparition 0.8s';
}

export function dataDisplay(chosenCity, cleanData) {
    document.getElementById('city').innerHTML = "Ville : " + chosenCity;
    let previousDay = ""
    let forecastContent = ""

    cleanData.forEach((element) => {
        let day = getDay(element.dt_txt.substr(0, 10))
        let temperature = element?.main?.temp || "na"
        let icon = element?.weather[0]?.icon || "na"
        let weather = element?.weather[0]?.description || "na"
        let dayMoment = getMoment(element.dt_txt.split(" ")[1])

        if (previousDay !== "" && day !== previousDay) {
            forecastContent += `<div style="width: 100%; height: 20px;"></div>`;
        }

        forecastContent += `    
            <article class="forecast-card">
            <p class="forecast-card__day">${day}</p>
            <p class="forecast-card__moment">${dayMoment}</p>
            <p class="forecast-card__temp">${temperature}°C</p>
            <img class="forecast-card__icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <p class="forecast-card__desc">${weather}</p>
            </article>
                `;


        previousDay = day;
    }
    );

    container.innerHTML = forecastContent

    document.getElementById('forecast-container').style.display = 'flex';
    document.getElementById('city').style.display = 'block';
    document.getElementById('forecast-container').style.animation = 'apparition 0.8s';
    document.getElementById('city').style.animation = 'apparition 0.8s';

}
