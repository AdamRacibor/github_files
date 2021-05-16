import { combineReducers } from 'redux';
import filters from './filters';
import files from './files';

export const mainReducer = combineReducers({
    filters,
    files,
});
