import React from "react";
import Header from "./Header";
import HomeScren from "./Screen/HomeScren";
import { Routes, Route } from "react-router-dom";
import BookingScreen from "./Screen/BookingScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import Adminpanel from "./Screen/Adminpanel";
import LandingScreen from "./Screen/LandingScreen";
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="home" element={<HomeScren />} />
        <Route
          path="/book/:roomid/:fromdate/:todate"
          element={<BookingScreen />}
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/admin" element={<Adminpanel />} />
        <Route path="/" element={<LandingScreen />} />
      </Routes>
    </div>
  );
};

export default App;
