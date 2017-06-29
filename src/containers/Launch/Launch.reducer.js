/*
 * REDUCER NAME CONVENTION: camelCase
 * <container>Reducer
 * launchReducer
*/

import LAUNCH from "./Launch.constants";

const initialState = {};

const launchReducer = (state: Object = initialState, action: Object) => {

  switch (action.type) {

    // ### GENERATED-REDUCER ###



    case LAUNCH.DESTROY:
      return initialState;

    default:
      return state;

  }

};


export default launchReducer;
