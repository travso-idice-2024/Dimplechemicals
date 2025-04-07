import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

// ✅ LIST CUSTOMERS
export const listCustomers = createAsyncThunk(
  "auth/listCustomers",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/customerList`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      return response.data;
    } catch (customerError) {
      return rejectWithValue(
        customerError.response?.data || "Failed to fetch customers"
      );
    }
  }
);

// ✅ FETCH ALL CUSTOMERS
export const fetchAllCustomers = createAsyncThunk(
  "auth/fetchAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/customerList`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { all: true },
      });
      return response.data;
    } catch (customerError) {
      return rejectWithValue(
        customerError.response?.data || "Failed to fetch all customers"
      );
    }
  }
);

//FETCH ALL CUSTOMERS ADDRESS

export const getAllAddressByCustomerId = createAsyncThunk(
  "auth/getAllAddressByCustomerId",
  async ({id}, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/leads/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (customerError) {
      return rejectWithValue(
        customerError.response?.data || "Failed to fetch all address"
      );
    }
  }
);

// ✅ ADD CUSTOMER
export const addCustomer = createAsyncThunk(
  "auth/addCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_URL}/auth/addCustomer`,
        customerData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (customerError) {
      return rejectWithValue(
        customerError.response?.data || "Failed to add customer"
      );
    }
  }
);

// ✅ UPDATE CUSTOMER
export const updateCustomer = createAsyncThunk(
  "auth/updateCustomer",
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/auth/updateCustomer/${id}`,
        customerData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (customerError) {
      return rejectWithValue(
        customerError.response?.data || "Failed to update customer"
      );
    }
  }
);

// ✅ DELETE CUSTOMER
export const removeCustomer = createAsyncThunk(
  "auth/removeCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}/auth/removeCustomer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id };
    } catch (customerError) {
      return rejectWithValue(
        customerError.response?.data || "Failed to delete customer"
      );
    }
  }
);

// 🔹 CUSTOMER SLICE
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    allCustomers: [],
    customerAddress:[],
    customerLoading: false,
    customerError: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.allCustomers = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.payload;
      })
      .addCase(getAllAddressByCustomerId.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(getAllAddressByCustomerId.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customerAddress = action.payload;
      })
      .addCase(getAllAddressByCustomerId.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.payload;
      })
      .addCase(listCustomers.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(listCustomers.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customers = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(listCustomers.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.payload;
      })
      .addCase(addCustomer.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.data = [action.payload.data, ...state.customers.data];
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customerLoading = false;

        // Ensure state.departments is always an array before using findIndex
        if (!Array.isArray(state.customers)) {
          state.customers = [];
        }

        const index = state.customers.findIndex(
          (cust) => cust.id === action.payload.id
        );

        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.payload;
      })
      .addCase(removeCustomer.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        state.customerLoading = false;

        // Ensure state.customers is an array before filtering
        if (!Array.isArray(state.customers)) {
          state.customers = [];
        }

        state.customers = state.customers.filter(
          (cust) => cust.id !== action.payload.id
        );
      })

      .addCase(removeCustomer.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.payload;
      });
  },
});

export default customerSlice.reducer;
