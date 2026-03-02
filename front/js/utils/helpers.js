export function getDay(date) {
    let x = new Date(date);
    let dateMinuscule = x.toLocaleDateString('fr-FR', { weekday: "long", day: "numeric" });
    return dateMinuscule.charAt(0).toUpperCase() + dateMinuscule.slice(1);
}

export function getMoment(input) {
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

export function dataClean(data) {
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