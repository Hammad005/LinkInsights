import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlices";
import linkReducer from "./features/link/linkSlices";

const Store = configureStore({
    reducer: {
        auth: authReducer,
        link: linkReducer
    }
});

export default Store;