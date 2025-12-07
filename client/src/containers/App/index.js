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