import { fork, take/*, select, put*/ } from "redux-saga/effects";
import { formActionSaga } from "redux-form-saga";


import appInitSaga from "./appInitSaga.js";



// ### IMPORTED-SAGA ###
import launchSaga from "../containers/Launch/Launch.saga";


function* init() {
  console.log("init");
}

export default function* rootSaga() {
  yield fork(appInitSaga);
  while (true) {
    yield take("##app/INIT_FINISH");
    yield [
      fork(formActionSaga),
      // ### INJECTED-SAGA ###
      fork(launchSaga),
      fork(init)
    ];
  }
}
