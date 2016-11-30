import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer';

export default combineReducers({
    errors: ErrorsReducer
});