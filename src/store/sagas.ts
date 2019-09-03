import { all } from 'redux-saga/effects';

import { watchAuth } from '../pages/Auth/sagas'
import { watchHome } from '../pages/Home/sagas'

// Root watcher saga
export default function* IndexSaga () {
	yield all([
		watchAuth(),
		watchHome(),
	])
}
