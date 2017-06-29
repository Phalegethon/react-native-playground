/*
 * REDUCER NAME CONVENTION: camelCase
 * <container>Reducer
 * loginReducer
*/

import LOGIN from "./Login.constants";

const initialState = {};

const loginReducer = (state: Object = initialState, action: Object) => {

  switch (action.type) {

    // ### GENERATED-REDUCER ###



    case LOGIN.DESTROY:
      return initialState;

    default:
      return state;

  }

};


export default loginReducer;
