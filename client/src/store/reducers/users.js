import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login } from "../../api/User.js";

const initialState = {
    tip: "",
};

export const login = createAsyncThunk("user/login", async data => {
    const response = await Login(data);
    if (response.data.status === 200) {
        localStorage.setItem("token", response.data.payload.token);
    }
    return response.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.tip = action.payload.msg;
        },
    },
});

export default userSlice.reducer;
