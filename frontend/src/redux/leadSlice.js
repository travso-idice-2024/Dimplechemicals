import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

// ✅ LIST LEADS (Paginated)
export const listLeads = createAsyncThunk(
  "auth/leadList",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/leadList`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch leads"
      );
    }
  }
);

// ✅ FETCH ALL LEADS (Without Pagination)
export const fetchAllLeads = createAsyncThunk(
  "lead/fetchAllLeads",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/lead/list`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { all: true },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch all leads"
      );
    }
  }
);

// ✅ ADD LEAD
export const addLead = createAsyncThunk(
  "auth/leadAdd",
  async (leadData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/auth/leadAdd`, leadData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(leadError.response?.data || "Failed to add lead");
    }
  }
);

// ✅ UPDATE LEAD
export const updateLead = createAsyncThunk(
  "auth/leadUpdate",
  async ({  id, updateLeadData }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/auth/leadUpdate/${id}`,
        updateLeadData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to update lead"
      );
    }
  }
);

// ✅ DELETE LEAD
export const removeLead = createAsyncThunk(
  "auth/leadRemove",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.put(
        `${API_URL}/auth/leadRemove/${id}`, // Correct route
        {}, // No body, but still need to pass an empty object
        {
          headers: { Authorization: `Bearer ${token}` }, // Headers go here
        }
      );
      return { id };
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to delete lead"
      );
    }
  }
);

// 🔹 LEAD SLICE
const leadSlice = createSlice({
  name: "lead",
  initialState: {
    leads: [],
    allLeads: [],
    leadLoading: false,
    leadError: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLeads.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.allLeads = action.payload;
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      .addCase(listLeads.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(listLeads.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.leads = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(listLeads.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      .addCase(addLead.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      //   .addCase(addLead.fulfilled, (state, action) => {
      //     // ✅ Add new lead to the existing state
      //     state.leads.data = [action.payload.data, ...state.leads.data];
      //   })
      .addCase(addLead.fulfilled, (state, action) => {
        state.leads.data = [action.payload.data, ...state.leads.data];
      })
    //   .addCase(addLead.fulfilled, (state, action) => {
    //     if (Array.isArray(action.payload?.data)) {
    //         state.leads = action.payload.data;  // ✅ Assigning directly to the array
    //     } else if (action.payload?.data) {
    //         state.leads = [...state.leads, action.payload.data];  // ✅ Append if it's a single object
    //     } else {
    //         state.leads = [...state.leads]; // ✅ Just retain the existing leads
    //     }
    // })
      .addCase(addLead.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      .addCase(updateLead.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.leadLoading = false;

        // Ensure leads is always an array before using findIndex
        if (!Array.isArray(state.leads)) {
          state.leads = [];
        }

        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.id
        );

        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      .addCase(removeLead.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(removeLead.fulfilled, (state, action) => {
        state.leadLoading = false;

        // Ensure state.leads is an array before filtering
        if (!Array.isArray(state.leads)) {
          state.leads = [];
        }

        state.leads = state.leads.filter(
          (lead) => lead.id !== action.payload.id
        );
      })
      .addCase(removeLead.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      });
  },
});

export default leadSlice.reducer;
