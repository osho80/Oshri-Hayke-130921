interface AppState {
  favCities: [] | { id: string; name: string }[];
  tempUnit: string;
  isDark: boolean;
}
const initialState: AppState = {
  favCities: [],
  tempUnit: "c",
  isDark: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CITY":
      return {
        ...state,
        favCities: [...state.favCities, action.city],
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
