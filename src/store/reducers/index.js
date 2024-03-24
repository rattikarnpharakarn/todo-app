import { combineReducers } from "redux";
import getTaskReducer from './taskReducers/getTask';
import loadingReducer from "./loadingReducers/loading";

const rootReducer = combineReducers({
    getTaskReucer: getTaskReducer,
    loading: loadingReducer
})

export default rootReducer