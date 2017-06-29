/* eslint-disable flowtype/require-parameter-type */
/*
 * ACTION NAME CONVENTION
 * <noun><Verb/Adj>
 * requestStart
*/

import LAUNCH from "./Launch.constants";

import type {
  // ### IMPORTED-TYPE ###
  TestType
} from "./Launch.flow-types";


// ### GENERATED-ACTION ###


export const testAction = (): TestType => {
  return {
    type: LAUNCH.TEST
  };
};
