import { getCookieValues } from "../services/cookieService";
import { AppState } from "../types/types";

const data = getCookieValues();
const { favCities, tempUnit, isDark } = data;
const darkMode = isDark ? JSON.parse(isDark) : false;
const unit = tempUnit ? tempUnit : "c";
const cities = favCities ? JSON.parse(favCities) : [];

const initialState: AppState = {
  favCities: cities,
  tempUnit: unit,
  isDark: darkMode,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CITY":
      return {
        ...state,
        favCities: [...state.favCities, action.city],
      };
    case "REMOVE_CITY":
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
