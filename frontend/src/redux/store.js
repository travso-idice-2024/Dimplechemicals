import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import departmentReducer from "./departmentSlice";
import useReducer from "./userSlice";
import customerReducer from "./customerSlice";
import leadReducer from "./leadSlice";
import productReducer from "./productSlice";
import costWorkingReducer from "./costWorkingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer, 
    user:useReducer,
    customer:customerReducer,
    lead: leadReducer,
    product: productReducer,  // add product reducer here...
    costWorking: costWorkingReducer
    // add other reducers here as needed...
  },
});

export default store;
