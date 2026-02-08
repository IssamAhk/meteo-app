const bouton = document.getElementById("search-button")


/* transfomer la date AAAA-MM-JJ */
function jourSemaine(date) {
    let x = new Date(date)
    let dateMinuscule = x.toLocaleDateString('fr-FR', { weekday: "long", day: "numeric" })
    return dateMinuscule.charAt(0).toUpperCase() + dateMinuscule.slice(1)
}

function moment(heure) {
    if (heure == "00:00:00") {
        return "Nuit"
    }
    if (heure == "09:00:00") {
        return "Matin"
    }
    if (heure == "15:00:00") {
        return "Après-midi"
    }
    if (heure == "21:00:00") {
        return "Soir"
    }

}

bouton.addEventListener('click',
    function meteo() {
        let villeChoisie = document.getElementById("city-input").value
        let url = `/meteo?ville=${villeChoisie}`

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

                    document.getElementById('city').innerHTML = "Ville : " + villeChoisie;

                    const container = document.getElementById('forecast-container');

                    let heuresVoulues = ["00:00:00", "09:00:00", "15:00:00", "21:00:00"];

                    let dataPropre = data.list.filter(item => {

                        let heureDeLaPrevision = item.dt_txt.split(" ")[1];

                        return heuresVoulues.includes(heureDeLaPrevision);
                    });

                    if (dataPropre[0].dt_txt !== data.list[0].dt_txt) {
                        dataPropre.unshift(data.list[0])
                    }

                    console.log("Voici mes données toutes propres :", dataPropre);

                    container.innerHTML = "";

                    let jourPrecedent = "";

                    dataPropre.forEach(element => {
                        let jour = jourSemaine(element.dt_txt.substr(0, 10))
                        let temperature = element.main.temp
                        let icone = element.weather[0].icon
                        let temps = element.weather[0].description
                        let momentJournée = moment(element.dt_txt.split(" ")[1])

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

