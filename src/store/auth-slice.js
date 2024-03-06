import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: true,
    reducers: {
        setUserAuthentication: (state, action) => {
            state = action.payload;
        }
    }
});

export const { setUserAuthentication } = authSlice.actions;
export default authSlice;