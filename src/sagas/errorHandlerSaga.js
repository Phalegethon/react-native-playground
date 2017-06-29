/* eslint-disable flowtype/require-return-type */
import { call, put, takeEvery, fork } from "redux-saga/effects";
// import { delay } from 'redux-saga';
export default function* errorHandlerSaga() {

  yield takeEvery("##axios/RESPONSE_RECEIVED", function* ({ payload }: Object) {
    const res = _.pick(payload, [
      "data",
      "status",
      "cancelled"
    ]);
    // if (res.cancelled) {
    // }

    switch (res.status) {
      case 401:
        break;

      case 0:
      case -1:
        break;

      case 404:
        break;

      case 500:
        break;

      default:
        return true;

    }
  });
}
