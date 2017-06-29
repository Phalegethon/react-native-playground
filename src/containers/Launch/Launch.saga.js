/*
 * SAGA NAME CONVENTION: camelCase
 * <NOUN><VERB>
 * RequestStart
*/
/* eslint-disable flowtype/require-return-type */

import { put, call, take, select, cancel, fork, takeLatest, throttle, takeEvery} from "redux-saga/effects";
import { delay } from "redux-saga";



import LAUNCH from "./Launch.constants";
// import * as launchActions from "./Launch.actions";


function* launchFlow() {
  console.log("LAUNCH init");
}

export default function* sagaWatcher() {
  yield [
    fork(launchFlow)
  ];
}
