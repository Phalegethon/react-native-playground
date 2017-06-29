/* eslint-disable flowtype/require-return-type */
import { take, call, put, fork, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";
import _ from "lodash";



export function* initSaga() {
  yield take("##app/INIT_START");
  yield put({
    type: "##app/INIT_FINISH"
  });
}





export default function* sagaWatcher() {
  yield fork(initSaga);
}
