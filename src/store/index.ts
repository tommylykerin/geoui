import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleWare from 'redux-saga';

import IndexReducer from './reducers';
import IndexSaga from './sagas';

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(
	IndexReducer,
	compose(
		applyMiddleware(sagaMiddleWare),
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
	)
);
sagaMiddleWare.run(IndexSaga);
export default store;				
