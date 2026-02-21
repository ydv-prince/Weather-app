const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Read API key securely
const apiKey = fs.readFileSync("keys.txt", "utf8").trim();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Weather endpoint
app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});