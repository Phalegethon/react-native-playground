import { select, put } from 'redux-saga/effects'
import { selectAvatar, startup } from '../../src/Sagas/StartupSagas'
import GithubActions from '../../src/Redux/GithubRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watches for the right action', () => {
  const step = stepper(startup())
  GithubActions.userRequest('GantMan')
  expect(step()).toEqual(select(selectAvatar))
  expect(step()).toEqual(put(GithubActions.userRequest('GantMan')))
})
