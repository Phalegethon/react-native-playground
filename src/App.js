import React, { Component } from "react";
import { Provider } from "react-redux";

import "./config";
import DebugConfig from "./config/DebugConfig";
import RootContainer from "./RootContainer";
import createStore from "./redux/CreateStore";

import rootReducer from "./redux/rootReducer.js";
import rootSaga from "./sagas/rootSaga.js";


// create our store
const store = createStore(rootReducer, rootSaga);

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ?
  console.tron.overlay(App) :
  App;
