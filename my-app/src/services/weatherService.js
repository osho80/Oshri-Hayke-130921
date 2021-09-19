import Axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "api/" : "//localhost:3030/api/";

export const queryCity = async (q) => {
  try {
    const query = BASE_URL + "cities/" + q;
    const res = await Axios.get(`${query}`);
    // console.log("My res:", res);
    return res.data;
  } catch (err) {
    console.log("City Query Failed");
    console.dir(err);
    throw err;
  }
};

export const getCurrentWeather = async (cityCode) => {
  try {
    const query = BASE_URL + "currentWeather/" + cityCode;
    const res = await Axios.get(`${query}`);
    console.log("My res:", res);
    return res.data;
  } catch (err) {
    console.log("CurrentWeather Request Failed");
    console.dir(err);
    throw err;
  }
};

export const getForecast = async (cityCode) => {
  try {
    const query = BASE_URL + "forecast/" + cityCode;

    const res = await Axios.get(`${query}`);
    return res.data;
  } catch (err) {
    console.log("Forecast Request Failed");
    console.dir(err);
    throw err;
  }
};

// add getForecastFarenheit
