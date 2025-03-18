import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import departmentReducer from "./departmentSlice";
import useReducer from "./userSlice";
import customerReducer from "./customerSlice";
import leadReducer from "./leadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer, 
    user:useReducer,
    customer:customerReducer,
    lead: leadReducer,
    // add other reducers here as needed...
  },
});

export default store;
