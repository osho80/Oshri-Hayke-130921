const fetch = require("node-fetch");
const apiKey = process.env.API_KEY;
const baseUrl = "http://dataservice.accuweather.com/";

const getCities = async (req, res) => {
  const q = req.params.q;
  const query = `locations/v1/cities/autocomplete?apikey=${apiKey}&language=en-us&q=${q}`;
  try {
    const response = await fetch(baseUrl + query);
    const cities = await response.json();
    res.send(cities);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const getCurrentWeather = async (req, res) => {
  const cityCode = req.params.cityCode;
  const query = `currentconditions/v1/${cityCode}`;
  const params = `?apikey=${apiKey}&language=en-us&details=false`;
  try {
    const response = await fetch(baseUrl + query + params);
    const currentWeather = await response.json();
    res.send(currentWeather);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const getForecast = async (req, res) => {
  const cityCode = req.params.cityCode;
  const query = `forecasts/v1/daily/5day/${cityCode}`;
  const params = `?apikey=${apiKey}&language=en-us&details=false&metric=true`;
  try {
    const response = await fetch(baseUrl + query + params);
    const forecast = await response.json();
    res.send(forecast);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const getFahrenheitForecast = async (req, res) => {
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
  getCities,
  getCurrentWeather,
  getForecast,
  getFahrenheitForecast,
};
