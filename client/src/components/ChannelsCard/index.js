import React from 'react';

import "./style.css";

const ChannelsCard = ({ title, count, coverImage }) => {
    return (
        <div id="channels-card-container">
            <div className="channels-card-image-wrapper">
                {coverImage && coverImage !== "N/A" ? (
                    <img 
                        src={coverImage} 
                        alt={`${title} Cover`} 
                        className="channels-card-poster" 
                    />
                ) : (
                    // Fallback if image is loading or missing
                    <div className="channels-card-placeholder">
                        📺
                    </div>
                )}
            </div>
            <h2 id="channels-card-header">
                {title}
            </h2>
            <p id="channels-count">{count} Shows / Movies</p>
        </div>
    );
}

export default ChannelsCard;