/* eslint-disable flowtype/require-parameter-type */
/*
 * ACTION NAME CONVENTION
 * <noun><Verb/Adj>
 * requestStart
*/

import LOGIN from "./Login.constants";

import type {
  // ### IMPORTED-TYPE ###
  TestType
} from "./Login.flow-types";


// ### GENERATED-ACTION ###


export const testAction = (): TestType => {
  return {
    type: LOGIN.TEST
  };
};
