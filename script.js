const bouton = document.getElementById("search-button")


/* transfomer la date AAAA-MM-JJ */
function getDay(date) {
    let x = new Date(date)
    let dateMinuscule = x.toLocaleDateString('fr-FR', { weekday: "long", day: "numeric" })
    return dateMinuscule.charAt(0).toUpperCase() + dateMinuscule.slice(1)
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

function search() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

function error() {
    if (data.cod != "200") {
        document.getElementById('city').innerHTML = "Introuvable, vérifiez l'orthographe.";
        document.getElementById('city').style.display = 'block';
        document.getElementById('city').style.animation = 'apparition 0.8s';
    }
}

function dataClean(data) {
    let heuresVoulues = ["00:00:00", "09:00:00", "15:00:00", "21:00:00"];

    let cleanData = data.list.filter(item => {

        let heureDeLaPrevision = item.dt_txt.split(" ")[1];

        return heuresVoulues.includes(heureDeLaPrevision);
    });

    if (cleanData[0].dt_txt !== data.list[0].dt_txt) {
        cleanData.unshift(data.list[0])
    }
}

function dataDisplay(data) {
    cleanData.forEach((element, idx) => {
        console.log({ idx })
        let jour = getDay(element.dt_txt.substr(0, 10))
        let temperature = element?.main?.temp || "na"
        let icone = element?.weather[0]?.icon || "na"
        let temps = element?.weather[0]?.description || "na"
        let momentJournée = getMoment(element.dt_txt.split(" ")[1])

        if (jourPrecedent !== "" && jour !== jourPrecedent) {
            container.innerHTML += `<div style="width: 100%; height: 20px;"></div>`;
        }

        container.innerHTML += `    
            <article class="forecast-card">
            <p class="forecast-card__day">${jour}</p>
            <p class="forecast-card__moment">${momentJournée}</p>
            <p class="forecast-card__temp">${temperature}°C</p>
            <img class="forecast-card__icon" src="https://openweathermap.org/img/wn/${icone}@2x.png">
            <p class="forecast-card__desc">${temps}</p>
            </article>
                `;


        jourPrecedent = jour;
    });

}

bouton.addEventListener('click',
    function meteo() {
        let choosedCity = document.getElementById("city-input").value
        let url = `/meteo?ville=${choosedCity}`
        document.getElementById('forecast-container').style.display = 'none';
        document.getElementById('forecast-container').style.animation = 'none';
        document.getElementById('city').style.display = 'none';
        document.getElementById('forecast-container').style.animation = 'none';


        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.cod != "200") {
                    document.getElementById('city').innerHTML = "Introuvable, vérifiez l'orthographe.";
                    document.getElementById('city').style.display = 'block';
                    document.getElementById('city').style.animation = 'apparition 0.8s';
                }
                else {

                    document.getElementById('city').innerHTML = "Ville : " + choosedCity;

                    const container = document.getElementById('forecast-container');

                    let heuresVoulues = ["00:00:00", "09:00:00", "15:00:00", "21:00:00"];

                    let cleanData = data.list.filter(item => {

                        let heureDeLaPrevision = item.dt_txt.split(" ")[1];

                        return heuresVoulues.includes(heureDeLaPrevision);
                    });

                    if (cleanData[0].dt_txt !== data.list[0].dt_txt) {
                        cleanData.unshift(data.list[0])
                    }

                    console.log("Voici mes données toutes propres :", cleanData);

                    container.innerHTML = "";

                    let jourPrecedent = "";

                    cleanData.forEach((element, idx) => {
                        console.log({ idx })
                        let jour = getDay(element.dt_txt.substr(0, 10))
                        let temperature = element?.main?.temp || "na"
                        let icone = element?.weather[0]?.icon || "na"
                        let temps = element?.weather[0]?.description || "na"
                        let momentJournée = getMoment(element.dt_txt.split(" ")[1])

                        if (jourPrecedent !== "" && jour !== jourPrecedent) {
                            container.innerHTML += `<div style="width: 100%; height: 20px;"></div>`;
                        }

                        container.innerHTML += `    
                            <article class="forecast-card">
                                <p class="forecast-card__day">${jour}</p>
                                <p class="forecast-card__moment">${momentJournée}</p>
                                <p class="forecast-card__temp">${temperature}°C</p>
                                <img class="forecast-card__icon" src="https://openweathermap.org/img/wn/${icone}@2x.png">
                                <p class="forecast-card__desc">${temps}</p>
                            </article>
                        `;


                        jourPrecedent = jour;
                    });

                    document.getElementById('forecast-container').style.display = 'flex';
                    document.getElementById('city').style.display = 'block';
                    document.getElementById('forecast-container').style.animation = 'apparition 0.8s';
                    document.getElementById('city').style.animation = 'apparition 0.8s';

                }
            })

    });

/* petites fonctions, mettre tout en anglais, switch case, changer lignes 55 à 62 */

