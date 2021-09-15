import Axios from "axios";
// import httpService from "./httpService.js";
// import { getReq } from "./httpService.js";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "api/" : "//localhost:3030/api/";

// const axios = Axios.create({
//   withCredentials: true,
// });

// export const weather = {
//   queryCity: (q) => httpService.get(`/cities/${q}`),
// };

// export const queryCity = async (q) => await getReq(`/cities`, q);
// const xhr = new XMLHttpRequest();

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

export const getForecast = async (cityCode, metric) => {
  try {
    // const query = `${BASE_URL}forecast/${cityCode}`;
    const query = BASE_URL + "forecast/" + cityCode;

    const res = await Axios.get(`${query}`);
    // const res = await axios({
    //   url: query,
    //   method: "post",
    //   data: { isMetric: metric },
    // });
    // console.log("My res:", res);
    return res.data;
  } catch (err) {
    console.log("Forecast Request Failed");
    console.dir(err);
    throw err;
  }
};
