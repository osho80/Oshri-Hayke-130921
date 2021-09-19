require("dotenv").config();
const fetch = require("node-fetch");
const apiKey = process.env.API_KEY;
const baseUrl = "http://dataservice.accuweather.com/";

const getFarenheitForecast = async (req, res) => {
  const cityCode = req.params.cityCode;
  const query = `forecasts/v1/daily/5day/${cityCode}`;
  const params = `?apikey=${apiKey}&language=en-us&details=false&metric=false`;
  try {
    const response = await fetch(baseUrl + query + params);
    const forecast = await response.json();
    res.send(forecast);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

module.exports = {
  getFarenheitForecast,
};
