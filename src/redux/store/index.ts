import reducers from "../reducers";
import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import get from "lodash/get";
import { IAppState } from "./types";

const preloadedStateDefault = {} as IAppState;
const configureStore = (preloadedState = preloadedStateDefault): Store<IAppState> => {
  if (process.env.NODE_ENV === "production") {
    const store = createStore(reducers, preloadedState, applyMiddleware(thunk));
    return store;
  }
  const composeEnhancers = get(window, ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) || compose;
  const store = createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

export default configureStore;
