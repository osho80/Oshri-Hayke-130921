export function addCity(city) {
  return (dispatch) => {
    dispatch(_addCity(city));
  };
}

export function removeCity(id) {
  return (dispatch) => {
    dispatch(_removeCity(id));
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

const _addCity = (city) => {
  return { type: "ADD_CITY", city };
};

const _removeCity = (id) => {
  return { type: "REMOVE_CITY", id };
};

const _setUnit = (unit) => {
  return { type: "SET_UNIT", unit };
};

const _setMode = (isDark) => {
  return { type: "SET_MODE", isDark };
};
