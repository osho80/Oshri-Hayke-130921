import Axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "api/" : "//localhost:3030/api/";

const axios = Axios.create({
  withCredentials: true,
});

// export default {
//   get(endpoint, data) {
//     return ajax(endpoint, "GET", data);
//   },
//   post(endpoint, data) {
//     return ajax(endpoint, "POST", data);
//   },
//   put(endpoint, data) {
//     return ajax(endpoint, "PUT", data);
//   },
//   delete(endpoint, data) {
//     return ajax(endpoint, "DELETE", data);
//   },
// };

async function ajax(endpoint, method = "get", data = null) {
  // const history = useHistory()

  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
    });

    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`
    );
    console.dir(err);
    if (err.response && err.response.status === 401) {
      // history.push('/admin')
      //   window.history.pushState({ path: "/admin" }, "", "/admin");
    }
    throw err;
  }
}

export const getReq = (endpoint, data) => ajax(endpoint, "GET", data);
