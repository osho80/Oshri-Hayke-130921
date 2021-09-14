require("dotenv").config();
const fetch = require("node-fetch");

const apiKey = process.env.API_KEY;

const baseUrl = "http://dataservice.accuweather.com/";
// const citiesurl =
//   "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
// const currentUrl =
//   "http://dataservice.accuweather.com/currentconditions/v1/215854";
// const _5Days =
//   "http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854";
// this is working:
// http://dataservice.accuweather.com/locations/v1/cities/autocomplete?
// apikey=P&language=en-us&q=tel
const getCities = async (req, res) => {
  console.log("My req", req);
  console.log("My params", req.parmas.q);
  const query = `locations/v1/cities/autocomplete?apikey=${apiKey}&language=en-us&q=`;
  res.send(200);
};

module.exports = {
  getCities,
};
