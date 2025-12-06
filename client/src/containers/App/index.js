import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Channels from "../../pages/Channels";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";

import "./style.css";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/channels" element={<Channels />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/forgot" element={<ForgotPassword />} />
                <Route exact path="/reset/:id/:token" element={<ResetPassword />} />
            </Routes>
        </div>
    );
};

export default App;