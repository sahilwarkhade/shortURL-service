import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { formatDat } from "date-fns";
import {formatDate} from "../../utiles/formatDate"
import { BASE_URL } from "../auth/authSlice";

const API_URL = `${BASE_URL}/analytics`;

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data.clicks;
      // Group clicks over time (e.g., per day)
      const clicksOverTimeMap = {};
      const deviceMap = {};
      const browserMap = {};

      data.forEach((entry) => {
        const date = formatDate(new Date(entry.timestamp), "yyyy-MM-dd");

        // Clicks over time
        clicksOverTimeMap[date] = (clicksOverTimeMap[date] || 0) + 1;

        // Device breakdown
        const device = entry.deviceType || "Unknown";
        deviceMap[device] = (deviceMap[device] || 0) + 1;

        // Browser breakdown
        const browser = entry.browser || "Unknown";
        browserMap[browser] = (browserMap[browser] || 0) + 1;
      });

      const clicksOverTime = Object.entries(clicksOverTimeMap).map(
        ([date, clicks]) => ({ date, clicks })
      );

      const deviceBreakdown = Object.entries(deviceMap).map(([device, count]) => ({
        device,
        count,
      }));

      const browserBreakdown = Object.entries(browserMap).map(([browser, count]) => ({
        browser,
        count,
      }));

      return { clicksOverTime, deviceBreakdown, browserBreakdown };
    } catch (err) {
    console.log(err)
      return thunkAPI.rejectWithValue("Failed to fetch analytics");
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    clicksOverTime: [],
    deviceBreakdown: [],
    browserBreakdown: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.clicksOverTime = action.payload.clicksOverTime;
        state.deviceBreakdown = action.payload.deviceBreakdown;
        state.browserBreakdown = action.payload.browserBreakdown;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectChartData = (state) => state.analytics;

export default analyticsSlice.reducer;
