import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from "./reducer/authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
});

export default () => configureStore({reducer: rootReducer});