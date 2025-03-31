import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const getAuthToken = () => localStorage.getItem("token");

// ✅ LIST USERS
export const listUsers = createAsyncThunk(
  "auth/listUsers",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/employeeList`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/employeeList`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { all: true }, // Fetch all users
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch all users"
      );
    }
  }
);

export const fetchUserWithRole = createAsyncThunk(
  "auth/fetchUserWithRole",
  async ({ roleId = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/employeeList`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { roleId: roleId }, // Fetch all users
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch all users"
      );
    }
  }
);

// ✅ ADD USER
export const addUser = createAsyncThunk(
  "auth/employeeAdd",
  async (userData, { rejectWithValue }) => {
    try {
      //console.log("userData",userData);
      const token = getAuthToken();
      const formData = new FormData();

      // Append profile image (single file)
      if (userData.profile_image instanceof File) {
        formData.append("profile_image", userData.profile_image);
      }

      // Append documents (multiple files)
      if (Array.isArray(userData.documents)) {
        userData.documents.forEach((file) => {
          formData.append("documents", file);
        });
      }

      // Append other fields
      Object.keys(userData).forEach((key) => {
        if (key !== "profile_image" && key !== "documents") {
          formData.append(key, userData[key]);
        }
      });

      // Debugging: Check FormData
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      // Send request
      const response = await axios.post(
        `${API_URL}/auth/employeeAdd`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add user");
    }
  }
);

// ✅ UPDATE USER
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      console.log("check redux data", id, userData);
      const token = getAuthToken();
      const formData = new FormData();

      // Append profile image (single file)
      if (userData.profile_image instanceof File) {
        formData.append("profile_image", userData.profile_image);
      }

      // Append documents (multiple files)
      if (Array.isArray(userData.documents)) {
        userData.documents.forEach((file) => {
          formData.append("documents", file);
        });
      }

      // Append other fields
      Object.keys(userData).forEach((key) => {
        if (key !== "profile_image" && key !== "documents") {
          formData.append(key, userData[key]);
        }
      });

      const response = await axios.put(
        `${API_URL}/auth/employeeUpdate/${id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

// ✅ DELETE USER
export const removeUser = createAsyncThunk(
  "auth/employeeDelete",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}/auth/employeeDelete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);

//emp report month year wise
export const EmpReportMonthYearWise = createAsyncThunk(
  "auth/allEmployeeData",
  async ({ month="", year="" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/allEmployeeData`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch emp");
    }
  }
);

//emp report department wise
export const EmpReportDepartmentWise = createAsyncThunk(
  "auth/employee-department",
  async ({ department_id, search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/employee-department`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { department_id, search },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch emp");
    }
  }
);


//emp report location wise report
export const EmpReportLocationWise = createAsyncThunk(
  "auth/employee-location",
  async ({ search = "" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/auth/employee-location`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch emp");
    }
  }
);

// 🔹 USER SLICE
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    allusers: [],
    emplocationData:[],
    empData:[],
    empDepartData:[],
    userDataWithRole: [],
    userLoading: false,
    userError: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.allusers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })

      .addCase(EmpReportLocationWise.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(EmpReportLocationWise.fulfilled, (state, action) => {
        state.userLoading = false;
        state.emplocationData = action.payload;
      })
      .addCase(EmpReportLocationWise.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })

      .addCase(EmpReportDepartmentWise.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(EmpReportDepartmentWise.fulfilled, (state, action) => {
        state.userLoading = false;
        state.empDepartData = action.payload;
      })
      .addCase(EmpReportDepartmentWise.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })
      

      .addCase(EmpReportMonthYearWise.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(EmpReportMonthYearWise.fulfilled, (state, action) => {
        state.userLoading = false;
        state.empData = action.payload;
      })
      .addCase(EmpReportMonthYearWise.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })

      .addCase(fetchUserWithRole.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchUserWithRole.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userDataWithRole = action.payload;
      })
      .addCase(fetchUserWithRole.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })

      .addCase(listUsers.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        // ✅ Add new customer to existing state without re-fetching
        state.users.data = [action.payload.data, ...state.users.data];
      })
      // .addCase(addUser.fulfilled, (state, action) => {
      //   state.userLoading = false;
      //   if (Array.isArray(state.users)) {
      //     state.users.push(action.payload.data);
      //   } else {
      //     state.users = [action.payload.data];
      //   }
      // })
      .addCase(addUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userLoading = false;

        if (!Array.isArray(state.users)) {
          state.users = [];
        }

        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })
      .addCase(removeUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      // .addCase(removeUser.fulfilled, (state, action) => {
      //   state.userLoading = false;
      //   state.users = state.users.filter(
      //     (user) => user.id !== action.payload.id
      //   );
      // })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.userLoading = false;

        // Ensure state.customers is an array before filtering
        if (!Array.isArray(state.users)) {
          state.users = [];
        }

        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });
  },
});

export default userSlice.reducer;
