import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnalytics,
} from "../features/analytics/analyticsSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Spinner from "../components/loader/Spinner";

const COLORS = ["#0ea5e9", "#22c55e", "#facc15", "#f97316", "#8b5cf6"];

const ChartPage = () => {
  const dispatch = useDispatch();
  const {
    clicksOverTime,
    deviceBreakdown,
    browserBreakdown,
    loading,
    error,
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <div className="bg-gray-950 min-h-screen py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight mb-10">
          Analytics Dashboard
        </h2>

        {loading ? (
          <div className="min-w-full min-h-full flex items-center justify-center">{<Spinner/>}</div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Clicks Over Time */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Clicks Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clicksOverTime}>
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis allowDecimals={false} stroke="#ccc" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Device Breakdown */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Device Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceBreakdown}
                    dataKey="count"
                    nameKey="device"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {deviceBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    wrapperStyle={{ color: "#d1d5db" }}
                    iconType="circle"
                    iconSize={10}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Browser Breakdown */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-md md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Browser Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={browserBreakdown}
                    dataKey="count"
                    nameKey="browser"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {browserBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    wrapperStyle={{ color: "#d1d5db" }}
                    iconType="circle"
                    iconSize={10}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartPage;
