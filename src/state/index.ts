import { mapValues } from "lodash";
import {
  applyMiddleware,
  combineReducers,
  createStore as createReduxStore,
  Reducer,
  Store
} from "redux";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import * as authentication from "./authentication";
import * as environment from "./environment";
import * as message from "./message";
import * as settings from "./settings";
import * as tasks from "./tasks";
import * as timer from "./timer";

interface IDuck {
  initializeStore?: (store: Store) => void;
  persistent: boolean;
  reducer: Reducer;
}

const ducks: {
  authentication: IDuck;
  environment: IDuck;
  message: IDuck;
  settings: IDuck;
  tasks: IDuck;
  timer: IDuck;
} = {
  authentication,
  environment,
  message,
  settings,
  tasks,
  timer
};

export interface IGlobalState {
  authentication: authentication.IState;
  environment: environment.IState;
  message: message.IState;
  settings: settings.IState;
  tasks: tasks.IState;
  timer: timer.IState;
}

export function createStore(): {
  persistor: Persistor;
  store: Store<any, any>;
} {
  const store = createReduxStore(
    persistReducer(
      {
        key: "root",
        storage,
        whitelist: Object.keys(ducks).filter(name => ducks[name].persistent)
      },
      combineReducers(mapValues(ducks, ({ reducer }) => reducer))
    ),
    applyMiddleware(thunk)
  );

  for (const name of Object.keys(ducks)) {
    const { initializeStore } = ducks[name];

    if (initializeStore) {
      initializeStore(store);
    }
  }

  return { persistor: persistStore(store), store };
}
