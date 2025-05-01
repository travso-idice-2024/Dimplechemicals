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

export const GenratedlistLeads = createAsyncThunk(
  "auth/GenratedlistLeads",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/get-lead-afterMeeting`, {
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

export const finalizeDeals = createAsyncThunk(
  "auth/finalised-deal",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/finalised-deal`, {
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

//addDeal
export const addDeal = createAsyncThunk(
  "auth/addDeal",
  async (dealData, { rejectWithValue }) => {
    //console.log("reduxdealData", dealData);
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/auth/addDeal`, dealData, {
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
      const response = await axios.post(
        `${API_URL}/auth/lead-communication`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to add lead communication"
      );
    }
  }
);

// ✅ UPDATE LEAD
export const updateLead = createAsyncThunk(
  "auth/leadUpdate",
  async ({ id, updateLeadData }, { rejectWithValue }) => {
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
  async ({ leadId }, { rejectWithValue }) => {
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
      return rejectWithValue(leadError.response?.data || "Failed to get lead");
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
      const response = await axios.get(
        `${API_URL}/auth/todaysAssignedLeadsCount`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
  async ({ leadId, page = 1, limit = 5, search = "" }, { rejectWithValue }) => {
    try {
      //console.log(leadId, page,limit, search);
      const token = getAuthToken();
      const response = await axios.get(
        `${API_URL}/auth/lead-communications-list/${leadId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { leadId, page, limit, search },
        }
      );
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
        headers: { Authorization: `Bearer ${token}` },
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
  async (
    {
      search = "",
      lead_status = "",
      lead_source = "",
      start_date = "",
      end_date = "",
      leadOwner = "",
      customer = "",
    },
    { rejectWithValue }
  ) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/all-leads`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          lead_status,
          lead_source,
          start_date,
          end_date,
          leadOwner,
          customer,
        },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch all leads"
      );
    }
  }
);

//converted lead report
export const ConvertedLeadData = createAsyncThunk(
  "auth/won-lead-communications",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${API_URL}/auth/won-lead-communications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch converted"
      );
    }
  }
);

export const updateSalesPersionAssignment = createAsyncThunk(
  "auth/add-lead-assigned-history",
  async ({ lead_ids, new_assigned_person_id }, { rejectWithValue }) => {
    try {
      // console.log("redux caling");
      // console.log(lead_id , new_assigned_person_id);
      const token = getAuthToken();
      const response = await axios.post(
        `${API_URL}/auth/add-lead-assigned-history`,
        { new_assigned_person_id, lead_ids }, // send only the field to update
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update assigned persion");
    }
  }
);

export const finalizeDealsList = createAsyncThunk(
  "auth/get-Deal-data",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/get-Deal-data`, {
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


export const getProductByLeadId = createAsyncThunk(
  "auth/get-lead-products",
  async ({lead_id }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/get-lead-products/${lead_id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { lead_id },
      });
      return response.data;
    } catch (leadError) {
      return rejectWithValue(
        leadError.response?.data || "Failed to fetch leads"
      );
    }
  }
);

// 🔹 LEAD SLICE
const leadSlice = createSlice({
  name: "lead",
  initialState: {
    leads: [],
    genleads:[],
    pductByleadId:[],
    allWonleads: [],
    communicationleads: [],
    communicationleadsList: [],
    finalizeDealsData: [],
    finalizeDealsListData:[],
    lead: null,
    salesPersonleads: [],
    allLeads: [],
    allLeadsCount: 0,
    leadLoading: false,
    leadError: null,
    totalPages: 1,
    todaysLeads: [],
    allfilterleads: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(updateSalesPersionAssignment.fulfilled, (state, action) => {
        const index = state.leads.data?.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.leads.data[index] = action.payload;
        }
      })
      .addCase(updateSalesPersionAssignment.rejected, (state, action) => {
        state.leadError = action.payload;
      })

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

      .addCase(finalizeDeals.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(finalizeDeals.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.finalizeDealsData = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(finalizeDeals.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })

      .addCase(finalizeDealsList.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(finalizeDealsList.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.finalizeDealsListData = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(finalizeDealsList.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })

      .addCase(ConvertedLeadData.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(ConvertedLeadData.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.allWonleads = action.payload;
      })
      .addCase(ConvertedLeadData.rejected, (state, action) => {
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

      .addCase(GenratedlistLeads.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(GenratedlistLeads.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.genleads = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(GenratedlistLeads.rejected, (state, action) => {
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
      // .addCase(addLead.fulfilled, (state, action) => {
      //   state.leads.data = [action.payload.data, ...(state.leads.data || [])];
      // })
      .addCase(addLead.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.leadError = null;
      
        state.leads = {
          ...state.leads,
          data: [action.payload.data, ...(state.leads.data || [])],
        };
      })
      
      .addCase(addLead.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      })

      .addCase(addDeal.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      // .addCase(addDeal.fulfilled, (state, action) => {
      //   state.leads.data = [action.payload.data, ...state.leads.data];
      // })
      
      .addCase(addDeal.fulfilled, (state, action) => {
        state.leadLoading = false;
      
        if (!Array.isArray(state.leads)) {
          state.leads = [];  // Reset to array if somehow not
        }
      
        state.leads.unshift(action.payload.data);
      })
      
      
      
      .addCase(addDeal.rejected, (state, action) => {
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
        state.communicationleads = [
          action.payload.data,
          ...state.communicationleads,
        ];
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
      })

      .addCase(getProductByLeadId.pending, (state) => {
        state.leadLoading = true;
        state.leadError = null;
      })
      .addCase(getProductByLeadId.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.pductByleadId = action.payload;
      })
      .addCase(getProductByLeadId.rejected, (state, action) => {
        state.leadLoading = false;
        state.leadError = action.payload;
      });
  },
});

export default leadSlice.reducer;
