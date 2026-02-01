const bouton = document.getElementById("search-button")


/* transfomer la date AAAA-MM-JJ */
function jourSemaine(date) {
    let x = new Date(date)
    let dateMinuscule = x.toLocaleDateString('fr-FR', { weekday: "long", day: "numeric" })
    return dateMinuscule.charAt(0).toUpperCase() + dateMinuscule.slice(1)
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

                    /* Température du jour J */

                    let jourJ = (data.list[0].dt_txt.substr(1, 9))
                    let temperatureJ = Math.round(data.list[0].main.temp)
                    let icone = data.list[0].weather[0].icon
                    let tempsJ = data.list[0].weather[0].description

                    container.innerHTML += `
                <article class="forecast-card">
                    <p class="forecast-card__day">Maintenant</p>
                    <p class="forecast-card__temp">${temperatureJ}°C</p>
                    <img class="forecast-card__icon" src="https://openweathermap.org/img/wn/${icone}@2x.png">
                    <p class="forecast-card__desc">${tempsJ}</p>
                </article>
             `;

                    /* JourJ + n : on séléctionne seulement la météo de 12h des jours autres que J */
                    let arrondiMidi = data.list.filter(item =>
                        item.dt_txt.includes("12:00:00")
                        && !item.dt_txt.includes(jourJ)
                    )

                    for (let i = 0; i < 5; i++) {
                        let jourPlusi = jourSemaine(arrondiMidi[i].dt_txt.substr(0, 10))
                        let temperaturePlusi = arrondiMidi[i].main.temp
                        let iconePlusi = arrondiMidi[i].weather[0].icon
                        let tempsPlusi = arrondiMidi[i].weather[0].description

                        container.innerHTML += `
                    <article class="forecast-card">
                        <p class="forecast-card__day">${jourPlusi}</p>
                        <p class="forecast-card__temp">${temperaturePlusi}°C</p>
                        <img class="forecast-card__icon" src="https://openweathermap.org/img/wn/${iconePlusi}@2x.png">
                        <p class="forecast-card__desc">${tempsPlusi}</p>
                    </article>
                `;

                    }

                    document.getElementById('forecast-container').style.display = 'flex';
                    document.getElementById('city').style.display = 'block';
                    document.getElementById('forecast-container').style.animation = 'apparition 0.8s';
                    document.getElementById('city').style.animation = 'apparition 0.8s';

                }




            })
    }

)









