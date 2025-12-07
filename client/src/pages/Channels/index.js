import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ChannelsCard from "../../components/ChannelsCard";
import "./style.css";

const apikey = process.env.REACT_APP_OMDB_API_KEY;

// Creating channel arrays
const userChannels = [
        {
            id: 1,
            channelName: "Nostalgia",
            contentIds: ["tt0206512", "tt0400095", "tt0115213", "tt0169414"]
        },
        {
            id: 2,
            channelName: "Crime/Thriller",
            contentIds: ["tt0773262","tt0364845", "tt0903747", "tt0810788", "tt0203259"]
        },
        {
            id: 3,
            channelName: "Action and Animation",
            contentIds: ["tt6741278", "tt0373732", "tt21209876", "tt3107288", ""]
        },
        {
            id: 4,
            channelName: "Netflix Favorites",
            contentIds: ["tt10813940", "tt7414406", "tt4574334"]
        }
    ];

const Channels = () => {
    const navigate = useNavigate();
    
    const [channelPosters, setChannelPosters] = useState({});

    useEffect(() => {
        const fetchCoverImages = async () => {
            const posters = {};

            const promises = userChannels.map(async (channel) => {
                const coverId = channel.contentIds[0];
                
                try {
                    const res = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${coverId}`);
                    const data = await res.json();
                    posters[channel.id] = data.Poster; 
                } catch (error) {
                    console.error("Failed to fetch poster for channel:", channel.channelName);
                }
            });

            await Promise.all(promises);
            setChannelPosters(posters);
        };

        fetchCoverImages();
    }, []);

    const handleChannelClick = (channel) => {
        navigate('/channels/:id', { state: { channelData: channel } });
    };

    return (
        <div id="channels-container">
            <h1 id="channels-header">My Channels</h1>
            <div id="channels-list">
                {userChannels.map((channel) => (
                    <div key={channel.id} onClick={() => handleChannelClick(channel)}>
                        <ChannelsCard
                            title={channel.channelName}
                            count={channel.contentIds.length}
                            coverImage={channelPosters[channel.id]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channels;