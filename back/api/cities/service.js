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
// http://dataservice.accuweather.com/locations/v1/cities/autocomplete?
// apikey=PmBDsujxINwZUWbupBtyUUcfXGMBnAIL;&language=en-us&q=tel
const getCities = async (req, res) => {
  const q = req.params.q;
  const query = `locations/v1/cities/autocomplete?apikey=${apiKey}&language=en-us&q=${q}`;
  try {
    const response = await fetch(baseUrl + query);
    const cities = await response.json();

    // console.log("My getCities cities:", cities);
    res.send(cities);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

module.exports = {
  getCities,
};
