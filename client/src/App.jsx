import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import QRCodeButton from "./components/QRCodeButton";
import ChartPage from "./pages/ChartPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import CreateLink from "./pages/Createlink";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/create" element={<CreateLink />} />
        <Route path="/about" element={<About />} />
        <Route path="/qr/:id" element={<QRCodeButton />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={isAuthenticated ? <ChartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={
            <h1 className="w-full min-h-[86vh] flex items-center justify-center font-bold mt-10 text-2xl">
              404 - Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


