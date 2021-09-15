import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  appStore: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
