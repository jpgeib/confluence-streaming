import React, { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
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

const getWindowDimensions = () => {
  const page = document.querySelector("html");
  const { clientWidth: width, clientHeight: height } = page;
  return {
    width,
    height
  }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const App = () => {

    const { width, height } = useWindowDimensions();
    const auth = useContext(AuthContext);

    return (
        <>
            <Navbar auth={auth} />
            <Routes>
                <Route exact path="/" element={<Home auth={auth} />} />
                <Route exact path="/channels" element={<Channels auth={auth} />} />
                <Route exact path="/channels/:channelId" element={<SingleChannel auth={auth} />} />
                <Route exact path="/onboarding" element={<Onboarding auth={auth} />} />
                <Route exact path="/register" element={<Register auth={auth} />} />
                <Route exact path="/login" element={<Login auth={auth} />} />
                <Route exact path="/forgot" element={<ForgotPassword auth={auth} />} />
                <Route exact path="/reset/:userId/:token" element={<ResetPassword auth={auth} />} />
            </Routes>
        </>
    );
};

export default App;