// import weatherService from "../services/weatherService";

export function getCurrentLocation() {
  return (dispatch) => {
    dispatch(_getCurrLocation());
  };
}

export function setLocation(location) {
  return (dispatch) => {
    dispatch(_setLocation, location);
  };
}

export function addCity(city) {
  return (dispatch) => {
    dispatch(_addCity(city));
  };
}

export function removeCity(city) {
  return (dispatch) => {
    dispatch(_removeCity(city));
  };
}

export function setUnit(unit) {
  return (dispatch) => {
    dispatch(_setUnit(unit));
  };
}

export function setMode(isDark) {
  return (dispatch) => {
    dispatch(_setMode(isDark));
  };
}

const _getCurrLocation = () => {
  return { type: "GET_LOCATION" };
};

const _setLocation = (location) => {
  return { type: "SET_LOCATION", location };
};

const _addCity = (city) => {
  return { type: "ADD_CITY", city };
};

const _removeCity = (city) => {
  return { type: "REMOVE_CITY", city };
};

const _setUnit = (unit) => {
  return { type: "SET_UNIT", unit };
};

const _setMode = (isDark) => {
  return { type: "SET_MODE", isDark };
};

// function _setLoggedInUser(user) {
//   return { type: "SET_LOGGEDIN_USER", user };
// }

// export function setLoggedinUser(user) {
//   return (dispatch) => {
//     sessionStorage.setItem("user", JSON.stringify(user));
//     dispatch(_setLoggedInUser(user));
//   };
// }
