require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  getCities,
  getCurrentWeather,
  getForecast,
  getFahrenheitForecast,
} = require("./api/weatherService");
const port = process.env.PORT || 3030;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.get("/api/cities/:q", getCities);
app.get("/api/currentWeather/:cityCode", getCurrentWeather);
app.get("/api/forecast/:cityCode", getForecast);
app.get("/api/f/forecast/:cityCode", getFahrenheitForecast);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
