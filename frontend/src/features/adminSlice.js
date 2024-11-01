import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Admin login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.msg);
      }
      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsername", username);
      return {
        token: data.token,
        username,
      };
    } catch (error) {
      return rejectWithValue("Server error");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: localStorage.getItem("adminToken") || null,
    username: localStorage.getItem("adminUsername") || null,
    error: null,
    loading: false,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUsername");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin, clearError } = adminSlice.actions;

export default adminSlice.reducer;
