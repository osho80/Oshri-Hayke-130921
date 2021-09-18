const initialState = {
  currLocation: {},
  favCities: [],
  tempUnit: "c",
  isDark: false,
};

const defaultLoc = initialState.favCities[0] || {
  id: "215854",
  name: "Tel Aviv",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCATION":
      return { ...state, currLocation: defaultLoc };
    case "SET_LOCATION":
      return { ...state, currLocation: action.location };
    case "ADD_CITY":
      return {
        ...state,
        favCities: [...state.favCities, { id: action.id, name: action.name }],
      };
    case " REMOVE_CITY":
      return {
        ...state,
        favCities: state.favCities.filter((city) => city.id !== action.id),
      };
    case "SET_CITIES":
      return {
        ...state,
        favCities: action.cities,
      };
    case "SET_UNIT":
      return { ...state, tempUnit: action.unit };
    case "SET_MODE":
      return { ...state, isDark: action.isDark };
    default:
      return state;
  }
};

export default appReducer;
