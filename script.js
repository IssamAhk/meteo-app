const API_KEY = import.meta.env.VITE_API_KEY

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
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${villeChoisie}&appid=${API_KEY}&units=metric&lang=fr`

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

                    /* Température du jour J */

                    let jourJ = (data.list[0].dt_txt.substr(1, 9))
                    let temperatureJ = Math.round(data.list[0].main.temp)
                    let icone = data.list[0].weather[0].icon
                    let tempsJ = data.list[0].weather[0].description

                    document.getElementById('day-0').innerHTML = "Maintenant"
                    document.getElementById('temp-0').innerHTML = temperatureJ + "°C";
                    document.getElementById('desc-0').innerHTML = tempsJ;
                    document.getElementById('icon-0').src = `https://openweathermap.org/img/wn/${icone}@2x.png`;


                    /* JourJ + n : on séléctionne seulement la météo de 12h des jours autres que J */
                    let arrondiMidi = data.list.filter(item =>
                        item.dt_txt.includes("12:00:00")
                        && !item.dt_txt.includes(jourJ)
                    )

                    for (let i = 0; i < 3; i++) {
                        let jourPlusi = jourSemaine(arrondiMidi[i].dt_txt.substr(0, 10))
                        let temperaturePlusi = arrondiMidi[i].main.temp
                        let iconePlusi = arrondiMidi[i].weather[0].icon
                        let tempsPlusi = arrondiMidi[i].weather[0].description

                        document.getElementById(`day-${i + 1}`).innerHTML = jourPlusi
                        document.getElementById(`temp-${i + 1}`).innerHTML = temperaturePlusi + "°C";
                        document.getElementById(`icon-${i + 1}`).src = `https://openweathermap.org/img/wn/${iconePlusi}@2x.png`;
                        document.getElementById(`desc-${i + 1}`).innerHTML = tempsPlusi;

                    }

                    document.getElementById('forecast-container').style.display = 'flex';
                    document.getElementById('city').style.display = 'block';
                    document.getElementById('forecast-container').style.animation = 'apparition 0.8s';
                    document.getElementById('city').style.animation = 'apparition 0.8s';

                }




            })
    }

)









