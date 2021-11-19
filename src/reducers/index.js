import { combineReducers } from 'redux';

import stateDataReducer from './stateDataReducer';

export default combineReducers({
	stateData: stateDataReducer,
});
