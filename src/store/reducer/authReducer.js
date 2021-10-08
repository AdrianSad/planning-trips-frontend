import {clearAuth, setUserData} from "../action/auth";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: null,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearAuth,
        setUserData,
    }
});

export default authSlice.reducer;
export const {actions} = authSlice;