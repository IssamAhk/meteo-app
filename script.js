const API_KEY = "dadb37f6cd27edd199997181306aae1b"

const bouton = document.getElementById("bouton")

bouton.addEventListener('click',
    function meteo() {
        let villeChoisie = document.getElementById("entree").value
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${villeChoisie}&appid=${API_KEY}&units=metric&lang=fr`

        document.querySelector('.semaine').style.display = 'none';
        document.querySelector('.semaine').style.animation = 'none';
        document.querySelector('.villeChoisie').style.display = 'none';
        document.querySelector('.semaine').style.animation = 'none';


        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.cod != "200") {
                    document.querySelector('.villeChoisie').innerHTML = "Introuvable, vérifiez l'orthographe.";
                    document.querySelector('.villeChoisie').style.display = 'block';
                    document.querySelector('.villeChoisie').style.animation = 'apparition 0.8s';
                }
                else {

                    document.querySelector('.villeChoisie').innerHTML = "Ville : " + villeChoisie;

                    /* Température du jour J */

                    let jourJ = (data.list[0].dt_txt.substr(1, 9))
                    let temperatureJ = Math.round(data.list[0].main.temp)
                    let icone = data.list[0].weather[0].icon
                    let tempsJ = data.list[0].weather[0].description

                    document.getElementById('jourJ').innerHTML = "Maintenant"
                    document.querySelector('.temperatureJ').innerHTML = temperatureJ + "°C";
                    document.querySelector('.tempsJ').innerHTML = tempsJ;
                    document.querySelector('.iconeJ').src = `https://openweathermap.org/img/wn/${icone}@2x.png`;


                    /* JourJ + n : on séléctionne seulement la météo de 12h des jours autres que J */
                    let arrondiMidi = data.list.filter(item =>
                        item.dt_txt.includes("12:00:00")
                        && !item.dt_txt.includes(jourJ)
                    )

                    /* Jour + 1 */
                    let jourPlus1 = "Demain"
                    let temperaturePlus1 = arrondiMidi[0].main.temp
                    let iconePlus1 = arrondiMidi[0].weather[0].icon
                    let tempsPlus1 = arrondiMidi[0].weather[0].description

                    document.getElementById('jourPlus1').innerHTML = jourPlus1
                    document.querySelector('.temperaturePlus1').innerHTML = temperaturePlus1 + "°C";
                    document.querySelector('.iconePlus1').src = `https://openweathermap.org/img/wn/${iconePlus1}@2x.png`;
                    document.querySelector('.tempsPlus1').innerHTML = tempsPlus1;

                    /* transfomer la date AAAA-MM-JJ */
                    function jourSemaine(date) {
                        let x = new Date(date)
                        let dateMinuscule = x.toLocaleDateString('fr-FR', { weekday: "long", day: "numeric" })
                        return dateMinuscule.charAt(0).toUpperCase() + dateMinuscule.slice(1)
                    }

                    /* Jour + 2 */
                    let jourPlus2 = jourSemaine((arrondiMidi[1].dt_txt.substr(0, 10)))
                    let temperaturePlus2 = arrondiMidi[1].main.temp
                    let iconePlus2 = arrondiMidi[1].weather[0].icon
                    let tempsPlus2 = arrondiMidi[1].weather[0].description

                    document.getElementById('jourPlus2').innerHTML = jourPlus2
                    document.querySelector('.temperaturePlus2').innerHTML = temperaturePlus2 + "°C";
                    document.querySelector('.iconePlus2').src = `https://openweathermap.org/img/wn/${iconePlus2}@2x.png`;
                    document.querySelector('.tempsPlus2').innerHTML = tempsPlus2;

                    /* Jour + 3 */
                    let jourPlus3 = jourSemaine((arrondiMidi[2].dt_txt.substr(0, 10)))
                    let temperaturePlus3 = arrondiMidi[2].main.temp
                    let iconePlus3 = arrondiMidi[2].weather[0].icon
                    let tempsPlus3 = arrondiMidi[2].weather[0].description

                    document.getElementById('jourPlus3').innerHTML = jourPlus3
                    document.querySelector('.temperaturePlus3').innerHTML = temperaturePlus3 + "°C";
                    document.querySelector('.iconePlus3').src = `https://openweathermap.org/img/wn/${iconePlus3}@2x.png`;
                    document.querySelector('.tempsPlus3').innerHTML = tempsPlus3;

                    /* Affichage de la div semaine */
                    document.querySelector('.semaine').style.display = 'flex';
                    document.querySelector('.villeChoisie').style.display = 'block';
                    document.querySelector('.semaine').style.animation = 'apparition 0.8s';
                    document.querySelector('.villeChoisie').style.animation = 'apparition 0.8s';

                }




            })
    }

)









