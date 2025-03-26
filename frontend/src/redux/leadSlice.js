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

//Lead communication for sales person
export const addLeadCommunication = createAsyncThunk(
  "auth/lead-communication",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/auth/lead-communication`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(leadError.response?.data || "Failed to add lead communication");
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

//get lead by id

export const getLeadById = createAsyncThunk(
  "auth/getLeadById",
  async ({leadId}, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${API_URL}/auth/getLeadById/${leadId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to get lead"
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

// ✅ FETCH ALL LEADS for sales person
export const todaysAssignedLeadsCount = createAsyncThunk(
  "auth/todaysAssignedLeadsCount",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/todaysAssignedLeadsCount`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch all leads count"
      );
    }
  }
);

// FETCH SLICE todaysLead list
export const todaysLead = createAsyncThunk(
  "auth/todaysLead",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/todaysLead`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch todaysLead"
      );
    }
  }
);

//lead communication 
export const leadCommunicationById = createAsyncThunk(
  "auth/lead-communications-list",
  async ({leadId, page = 1, limit = 5, search = ""}, { rejectWithValue }) => {
    try {
      //console.log(leadId, page,limit, search);
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/lead-communications-list/${leadId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { leadId, page, limit, search },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch all communication leads"
      );
    }
  }
);


//Todays lead report
// ✅ FETCH ALL LEADS (Without Pagination)
export const todaysLeadReport = createAsyncThunk(
  "auth/users-todays-leads",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/users-todays-leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch all TodaysLeadReport"
      );
    }
  }
);


//lead by status
export const AllLeadsData = createAsyncThunk(
  "auth/all-leads",
  async ({search = "",lead_status="", lead_source="", start_date="", end_date="" ,leadOwner="" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/all-leads`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {search ,lead_status,lead_source,start_date,end_date,leadOwner},
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch all leads"
      );
    }
  }
);


// 🔹 LEAD SLICE
const leadSlice = createSlice({
  name: "lead",
  initialState: {
    leads: [],
    communicationleads:[],
    communicationleadsList:[],
    lead:null,
    salesPersonleads:[],
    allLeads: [],
    allLeadsCount:0,
    leadLoading: false,
    leadError: null,
    totalPages: 1,
    todaysLeads:[],
    allfilterleads:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
    .addCase(AllLeadsData.pending, (state) => {
      state.leadLoading = true;
      state.leadError = null;
    })
    .addCase(AllLeadsData.fulfilled, (state, action) => {
      state.leadLoading = false;
      state.allfilterleads = action.payload;
    })
    .addCase(AllLeadsData.rejected, (state, action) => {
      state.leadLoading = false;
      state.leadError = action.payload;
    })
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
      
      .addCase(todaysLeadReport.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(todaysLeadReport.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.todaysLeads = action.payload;
      })
      .addCase(todaysLeadReport.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      .addCase(todaysAssignedLeadsCount.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(todaysAssignedLeadsCount.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.allLeadsCount = action.payload;
      })
      .addCase(todaysAssignedLeadsCount.rejected, (state, action) => {
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
      
      .addCase(leadCommunicationById.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(leadCommunicationById.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.communicationleadsList = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(leadCommunicationById.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      
      .addCase(todaysLead.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(todaysLead.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.salesPersonleads = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(todaysLead.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      .addCase(addLead.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.leads.data = [action.payload.data, ...state.leads.data];
      })
      .addCase(addLead.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })
      .addCase(addLeadCommunication.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(addLeadCommunication.fulfilled, (state, action) => {
        // Ensure communicationleads is treated as an array
        if (!Array.isArray(state.communicationleads)) {
          state.communicationleads = [];
        }
      
        // Add new lead to the list
        state.communicationleads = [action.payload.data, ...state.communicationleads];
        state.leadLoading = false;
        state.leadError = null;
      })
      .addCase(addLeadCommunication.rejected, (state, action) => {
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
      })
      // ✅ Get Lead by ID Cases
      .addCase(getLeadById.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(getLeadById.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.lead = action.payload;
      })
      .addCase(getLeadById.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      });
  },
});

export default leadSlice.reducer;
