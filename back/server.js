const express = require("express");
const cors = require("cors");
const path = require("path");

const { getCities } = require("./api/cities/service");
const { getCurrentWeather } = require("./api/currentWeather/service");
const { getForecast } = require("./api/forecast/service");
const { getFarenheitForecast } = require("./api/f/forecast/service");
const port = process.env.PORT || 3030;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
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
app.get("/api/f/forecast/:cityCode", getFarenheitForecast);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
