import 'dotenv/config';
import express from 'express';

const app = express();

// Sert les fichiers du dossier courant (index.html, style.css, script.js)
app.use(express.static('.'));

app.get('/meteo', async (req, res) => {
    try {
        const ville = req.query.ville;
        const apiKey = process.env.API_KEY;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&units=metric&lang=fr`);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur" });
    }
});

app.listen(3000, () => console.log('Serveur prêt : http://localhost:3000'));