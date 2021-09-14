require("dotenv").config();
const fetch = require("node-fetch");
const apiKey = process.env.API_KEY;
const baseUrl = "http://dataservice.accuweather.com/";

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

module.exports = {
  getCurrentWeather,
};
