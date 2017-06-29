import { createStore, applyMiddleware, compose } from "redux";
import { autoRehydrate } from "redux-persist";
import { Platform } from "react-native";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
// import devTools from "remote-redux-devtools";

import _ from "lodash";


import Config from "../config/DebugConfig";
import RehydrationServices from "../services/RehydrationServices";
import ReduxPersist from "../config/ReduxPersist";

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);


  //
  // ─── REDUX LOGGER ───────────────────────────────────────────────────────────────
  //
  if (__DEV__) {
    // redux immutable
    middleware.push(
      reduxImmutableStateInvariant()
    );

    // logger
    middleware.push(
      createLogger({
        duration: true,
        collapsed: true,
        diff: true,
        logErrors: true,
        predicate: (getState, action) => !_.includes([
          "@@redux-form/BLUR",
          "@@redux-form/FOCUS",
          "@@redux-form/CHANGE",
          "@@redux-form/REGISTER/FIELD",
          "@@redux-form/DESTROY",
          "@@redux-form/TOUCH",
          "@@redux-form/UPDATE_SYNC_ERRORS",
          "@@redux-form-submit-saga/FORM_SUBMIT"
        ], action.type)
      })
    );

    // redux dev tools
    // enhancers.push(
    //   devTools({
    //     name: Platform.OS,
    //     hostname: "localhost",
    //     port: 5678
    //   })
    // );

    // if (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    //   ("devToolsExtension" in window)) {
    //   enhancers.push(
    //     window.devToolsExtension({
    //       actionsBlacklist: [
    //         "@@redux-form/FOCUS",
    //         "@@redux-form/BLUR",
    //         "@@redux-form/TOUCH",
    //         "@@redux-form/CHANGE",
    //         "@@redux-form/START_SUBMIT",
    //         "@@redux-form/STOP_SUBMIT",
    //         "@@redux-form/SET_SUBMIT_SUCCEEDED",
    //         "@@redux-form/SET_SUBMIT_FAILED",
    //         "@@redux-form/UPDATE_SYNC_ERRORS",
    //         "@@redux-form/REGISTER_FIELD",
    //         "@@redux-form/INITIALIZE",
    //         "@@redux-form/CHANGE",
    //         "@@redux-form/DESTROY",
    //         "##axios/REQUEST_SENT",
    //         "##axios/RESPONSE_RECEIVED",
    //         "##user/CLICK",
    //         "SHARED/LOADING_STATUS",
    //         "##app/VERSION_CHECK"
    //       ]
    //     })
    //   );
    // }

  }

  const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate());
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;
  const store = createAppropriateStore(rootReducer, composeEnhancers(...enhancers));

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store);
  }

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
};
