import axios from "axios";
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
  console.log("Querying city");
  try {
    const x = BASE_URL + "cities/" + q;
    console.log("My x:", x);
    const res = await axios.get(`${x}`);
    console.log("My res:", res);
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log("My xhr res:", res);
    //   }
    // };

    // xhr.open("Get", x);
    // xhr.send();
  } catch (err) {
    console.log("Bad request!!!!!");
    console.dir(err);
    throw err;
  }
};
