import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./features/jobsSlice";
import adminReducer from "./features/adminSlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    admin: adminReducer,
  },
});

export default store;
