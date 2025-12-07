import React from "react";
import ChannelsCard from "../../components/ChannelsCard";

import "./style.css";

const Channels = () => {
    return (
        <div id="channels-container">
            <h1 id="channels-header">My Channels</h1>
            <div id="channels-list">
                {/* User Channels Appear Here */}
                <ChannelsCard />
            </div>
        </div>
    );
};

export default Channels;