import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../container/userStore/userStore";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;