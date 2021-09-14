require("dotenv").config();
const fetch = require("node-fetch");
const apiKey = process.env.API_KEY;
const baseUrl = "http://dataservice.accuweather.com/";

const getForecast = async (req, res) => {
  const cityCode = req.params.cityCode;
  //   const isMetric = req.body.metric;
  //   console.log("My body:", req);
  //   console.log("My cityCode:", cityCode);
  //   console.log("isMetric:", isMetric);
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

module.exports = {
  getForecast,
};
