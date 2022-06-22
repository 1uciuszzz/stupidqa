import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/users.js";

export default configureStore({
    reducer: { user: userSlice },
});
