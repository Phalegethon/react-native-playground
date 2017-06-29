import { put } from 'redux-saga/effects'
import { login } from '../../src/Sagas/LoginSagas'
import LoginActions from '../../src/Redux/LoginRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('success', () => {
  const mock = { username: 'a', password: 'b' }
  const step = stepper(login(mock))

  expect(step()).toEqual(put(LoginActions.loginSuccess(mock.username)))
})

test('failure', () => {
  const mock = { username: '', password: '' }
  const step = stepper(login(mock))

  expect(step()).toEqual(put(LoginActions.loginFailure('WRONG')))
})
