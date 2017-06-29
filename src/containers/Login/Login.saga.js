/*
 * SAGA NAME CONVENTION: camelCase
 * <NOUN><VERB>
 * RequestStart
*/
/* eslint-disable flowtype/require-return-type */

import { put, call, take, select, cancel, fork, takeLatest, throttle, takeEvery} from "redux-saga/effects";
import { delay } from "redux-saga";



import LOGIN from "./Login.constants";
// import * as loginActions from "./Login.actions";


function* loginFlow() {
  console.log("LOGIN init");
}

export default function* sagaWatcher() {
  yield [
    fork(loginFlow)
  ];
}
