import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../auth/authSlice";


export const fetchLinks = createAsyncThunk("links/fetchLinks", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${BASE_URL}/alluserlinks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log("ERROR", err)
    return thunkAPI.rejectWithValue("Error fetching links");
  }
});

export const createShortLink = createAsyncThunk("links/createShortLink", async (payload, thunkAPI) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${BASE_URL}/shortlink`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Error creating link");
  }
});

const linkSlice = createSlice({
  name: "links",
  initialState: {
    allLinks: [],
    loading: false,
    error: null,
    createdLink: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.allLinks = action.payload;
        state.error=null
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createShortLink.pending, (state) => {
        state.loading = true;
        state.createdLink = null;
      })
      .addCase(createShortLink.fulfilled, (state, action) => {
        state.loading = false;
        state.createdLink = action.payload;
        state.error=null;
      })
      .addCase(createShortLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default linkSlice.reducer;
