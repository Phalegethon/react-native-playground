import { combineReducers } from "redux";
import { NavigationActions } from "react-navigation";

import AppNavigator from "../navigation/AppNavigator.js";


// Start with two routes: The Main screen, with the Login screen on top.
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Login")
);


const navReducer = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case "Login":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case "Logout":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "Login"
        }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
