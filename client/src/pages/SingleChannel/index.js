import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import ProgramModal from "../../components/ProgramModal";

import "./style.css";

const SingleChannel = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [channelData, setChannelData] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [visiblePrograms, setVisiblePrograms] = useState(4);
    const [loading, setLoading] = useState(true);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Channel configurations
    const channels = {
        nostalgia: {
            title: "Nostalgia",
            movieIds: ["tt0096697", "tt0364845", "tt1667889", "tt0412142"]
        },
        crime: {
            title: "Crime/Thriller",
            movieIds: ["tt0773262", "tt0903747", "tt0364845", "tt0460627", "tt0810788"]
        },
        action: {
            title: "Action and Animation",
            movieIds: ["tt6741278", "tt7441658", "tt0760437", "tt021333", "tt0103359"]
        },
        drama: {
            title: "Drama",
            movieIds: ["tt0944947", "tt1856010", "tt0804503", "tt0903747"]
        }
    };

    useEffect(() => {
        const fetchChannelData = async () => {
            setLoading(true);
            const channel = channels[channelId];
            
            if (!channel) {
                navigate("/channels");
                return;
            }

            try {
                const apikey = process.env.REACT_APP_OMDB_API_KEY;

                if (!apikey) {
                    console.error("API Key is missing!");
                    setLoading(false);
                    return;
                }

                // Fetch all programs for this channel
                const promises = channel.movieIds.map(id =>
                    fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`)
                        .then(res => res.json())
                );

                const results = await Promise.all(promises);
                const validPrograms = results.filter(program => program.Response === "True");

                setChannelData(channel);
                setPrograms(validPrograms);
                setLoading(false);
            } catch (error) {
                console.error("Fetch error:", error);
                setLoading(false);
            }
        };

        fetchChannelData();
    }, [channelId, navigate]);

    const handleSchedule = () => {
        // Navigate to schedule page with channel context
        navigate("/schedule", { state: { channel: channelData, programs } });
    };

    const handleShuffle = () => {
        // Shuffle the programs array
        const shuffled = [...programs].sort(() => Math.random() - 0.5);
        setPrograms(shuffled);
    };

    const handleShowMore = () => {
        setVisiblePrograms(prev => prev + 4);
    };

    const handleProgramClick = (program) => {
        setSelectedProgram(program);
        setModalOpen(true);
    };

    if (loading) {
        return (
            <div id="single-channel-container">
                <p className="loading-text">Loading channel...</p>
            </div>
        );
    }

    if (!channelData) {
        return (
            <div id="single-channel-container">
                <p className="error-text">Channel not found</p>
            </div>
        );
    }

    const featuredProgram = programs[0];

    return (
        <>
            <div id="single-channel-container">
                <h1 id="single-channel-header">{channelData.title}</h1>

                <div className="channel-content">
                    <div className="featured-section">
                        {featuredProgram && (
                            <div className="featured-poster">
                                <img 
                                    src={featuredProgram.Poster} 
                                    alt={featuredProgram.Title}
                                    onClick={() => handleProgramClick(featuredProgram)}
                                />
                            </div>
                        )}

                        <div className="action-buttons">
                            <button className="channel-action-btn" onClick={handleSchedule}>
                                <Icon name="calendar alternate outline" />
                                Schedule
                            </button>
                            <button className="channel-action-btn" onClick={handleShuffle}>
                                <Icon name="random" />
                                Shuffle
                            </button>
                        </div>
                    </div>

                    <div className="programs-list">
                        {programs.slice(0, visiblePrograms).map((program) => (
                            <div 
                                key={program.imdbID} 
                                className="program-item"
                                onClick={() => handleProgramClick(program)}
                            >
                                <div className="program-poster">
                                    <img src={program.Poster} alt={program.Title} />
                                </div>
                                <div className="program-info">
                                    <h3>{program.Title}</h3>
                                    <p className="program-seasons">
                                        {program.Type === "series" 
                                            ? `${program.totalSeasons || "Multiple"} Seasons`
                                            : program.Year
                                        }
                                    </p>
                                    <p className="program-description">{program.Plot}</p>
                                </div>
                            </div>
                        ))}

                        {visiblePrograms < programs.length && (
                            <button className="show-more-btn" onClick={handleShowMore}>
                                <Icon name="chevron down" />
                                MORE SHOWS
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {selectedProgram && (
                <ProgramModal 
                    program={selectedProgram}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};

export default SingleChannel;