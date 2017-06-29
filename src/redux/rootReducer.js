import { combineReducers } from "redux";
import { reducer as reduxformReducer } from "redux-form";

import navReducer from "./navReducer.js";


/*
// ### IMPORTED-CONSTANT ###
import LOGIN from "../containers/Login/Login.constants";
import LAUNCH from "../containers/Launch/Launch.constants";
*/


// ### IMPORTED-REDUCER ###
import loginReducer from "../containers/Login/Login.reducer";
import launchReducer from "../containers/Launch/Launch.reducer";


const rootReducer = combineReducers({
  // ### INJECTED-REDUCER ###
  login: loginReducer,
  launch: launchReducer,
  form: reduxformReducer,
  nav: navReducer
});




export default rootReducer;
