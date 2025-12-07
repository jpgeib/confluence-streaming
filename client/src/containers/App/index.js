import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "../../pages/Home";
import Channels from "../../pages/Channels";
import SingleChannel from "../../pages/SingleChannel";
import Onboarding from "../../pages/Onboarding";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";

import "./style.css";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/channels" element={<Channels />} />
                <Route exact path="/channels/:channelId" element={<SingleChannel />} />
                <Route exact path="/onboarding" element={<Onboarding />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/forgot" element={<ForgotPassword />} />
                <Route exact path="/reset/:userId/:token" element={<ResetPassword />} />
            </Routes>
        </>
    );
};

export default App;