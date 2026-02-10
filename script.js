const searchButton = document.getElementById("search-button");
const container = document.getElementById('forecast-container');

function getDay(date) {
    let x = new Date(date);
    let dateMinuscule = x.toLocaleDateString('fr-FR', { weekday: "long", day: "numeric" });
    return dateMinuscule.charAt(0).toUpperCase() + dateMinuscule.slice(1);
}
function getMoment(input) {
    switch (input) {
        case "00:00:00":
            return "Nuit";
        case "09:00:00":
            return "Matin";
        case "15:00:00":
            return "Après-midi";
        case "21:00:00":
            return "Soir";
        default:
            return input;
    }
}

function resetUI() {
    document.getElementById('forecast-container').style.display = 'none';
    document.getElementById('forecast-container').style.animation = 'none';
    document.getElementById('city').style.display = 'none';
    document.getElementById('forecast-container').style.animation = 'none';
}
async function search(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
function displayError() {
    document.getElementById('city').innerHTML = "Introuvable, vérifiez l'orthographe.";
    document.getElementById('city').style.display = 'block';
    document.getElementById('city').style.animation = 'apparition 0.8s';
}
function dataClean(data) {
    let targetHours = {
        0: 1,
        9: 1,
        15: 1,
        21: 1,
    };

    let cleanData = data.list.filter(item => {
        const hour = (item.dt / 3600) % 24
        return targetHours[hour]
    });

    if (cleanData[0].dt_txt !== data.list[0].dt_txt) {
        cleanData.unshift(data.list[0])
    }

    return cleanData
}
function dataDisplay(chosenCity, cleanData) {
    document.getElementById('city').innerHTML = "Ville : " + chosenCity;
    let previousDay = ""

    cleanData.forEach((element) => {
        let day = getDay(element.dt_txt.substr(0, 10))
        let temperature = element?.main?.temp || "na"
        let icon = element?.weather[0]?.icon || "na"
        let weather = element?.weather[0]?.description || "na"
        let dayMoment = getMoment(element.dt_txt.split(" ")[1])

        if (previousDay !== "" && day !== previousDay) {
            container.innerHTML += `<div style="width: 100%; height: 20px;"></div>`;
        }

        container.innerHTML += `    
            <article class="forecast-card">
            <p class="forecast-card__day">${day}</p>
            <p class="forecast-card__moment">${dayMoment}</p>
            <p class="forecast-card__temp">${temperature}°C</p>
            <img class="forecast-card__icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <p class="forecast-card__desc">${weather}</p>
            </article>
                `;


        previousDay = day;
    });

    document.getElementById('forecast-container').style.display = 'flex';
    document.getElementById('city').style.display = 'block';
    document.getElementById('forecast-container').style.animation = 'apparition 0.8s';
    document.getElementById('city').style.animation = 'apparition 0.8s';

}

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
