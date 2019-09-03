import { combineReducers } from 'redux';
import authReducers from '../pages/Auth/reducers';
import homeReducers from '../pages/Home/reducers';

const IndexReducer = combineReducers({
	auth: <any>authReducers,
	home: homeReducers,
});

export default IndexReducer;