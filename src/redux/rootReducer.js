import { combineReducers } from "redux";
import { reducer as reduxformReducer } from "redux-form";

import navReducer from "./navReducer.js";


/*
// ### IMPORTED-CONSTANT ###
import LAUNCH from "../containers/Launch/Launch.constants";
*/


// ### IMPORTED-REDUCER ###
import launchReducer from "../containers/Launch/Launch.reducer";


const rootReducer = combineReducers({
  // ### INJECTED-REDUCER ###
  launch: launchReducer,
  form: reduxformReducer,
  nav: navReducer
});




export default rootReducer;
