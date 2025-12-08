import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChannelsCard from "../../components/ChannelsCard";

import "./style.css";

const Channels = () => {
    const navigate = useNavigate();
    const apikey = process.env.REACT_APP_OMDB_API_KEY;

    // Creating channel arrays with IDs for routing
    const channels = [
        {
            id: "nostalgia",
            title: "Nostalgia",
            movieIds: ["tt0096697", "tt0364845", "tt1667889", "tt0412142"]
        },
        {
            id: "crime",
            title: "Crime/Thriller",
            movieIds: ["tt0773262", "tt0903747", "tt0364725", "tt2085059", "tt0460649"]
        },
        {
            id: "action",
            title: "Action and Animation",
            movieIds: ["tt6741278", "tt7441658", "tt0760437", "tt021333", "tt0103359"]
        },
        {
            id: "drama",
            title: "Drama",
            movieIds: ["tt0944947", "tt1856010", "tt0804503", "tt0903747"]
        }
    ];

    const [channelData, setChannelData] = useState([]);

    useEffect(() => {
        const fetchChannelCovers = async () => {
            const data = await Promise.all(
                channels.map(async (channel) => {
                    try {
                        const firstMovieId = channel.movieIds[0];
                        const res = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${firstMovieId}`);
                        const movie = await res.json();
                        
                        return {
                            ...channel,
                            coverImage: movie.Poster,
                            count: channel.movieIds.length
                        };
                    } catch (error) {
                        console.error(`Error fetching cover for ${channel.title}:`, error);
                        return {
                            ...channel,
                            coverImage: null,
                            count: channel.movieIds.length
                        };
                    }
                })
            );
            setChannelData(data);
        };

        fetchChannelCovers();
    }, [apikey]);

    const handleChannelClick = (channelId) => {
        navigate(`/channels/${channelId}`);
    };

    return (
        <div id="channels-container">
            <h1 id="channels-header">My Channels</h1>
            <div id="channels-list">
                {channelData.map((channel) => (
                    <div key={channel.id} onClick={() => handleChannelClick(channel.id)}>
                        <ChannelsCard
                            title={channel.title}
                            count={channel.count}
                            coverImage={channel.coverImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channels;