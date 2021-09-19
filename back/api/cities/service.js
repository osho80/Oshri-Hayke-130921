require("dotenv").config();
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

module.exports = {
  getCities,
};
