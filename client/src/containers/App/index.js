import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Channels from "../../pages/Channels";

import "./style.css";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/channels" element={<Channels />} />
            </Routes>
        </div>
    );
};

export default App;