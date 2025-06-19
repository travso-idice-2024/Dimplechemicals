import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import departmentReducer from "./departmentSlice";
import useReducer from "./userSlice";
import customerReducer from "./customerSlice";
import leadReducer from "./leadSlice";
import productReducer from "./productSlice";
import costWorkingReducer from "./costWorkingSlice";
import poaReducer from "./poaSlice";
import categoryReducer from "./categorySlice";
import googleCalenderAuthReducer from "./googleCalenderAuthSlice";
import googleGmailAuthReducer from "./googleGmailAuthSlice";
import { businessAssociateApi } from "./services/businessAssociateService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer, 
    user:useReducer,
    customer:customerReducer,
    lead: leadReducer,
    product: productReducer,  // add product reducer here...
    costWorking: costWorkingReducer,
    poa:poaReducer,
    category:categoryReducer,
    googleCalenderAuth:googleCalenderAuthReducer,
    googleGmailAuth:googleGmailAuthReducer,
   
    [businessAssociateApi.reducerPath]: businessAssociateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(businessAssociateApi.middleware)
});

export default store;
