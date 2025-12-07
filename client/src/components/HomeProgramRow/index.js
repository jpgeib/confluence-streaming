import React, { useState, useEffect, useRef } from "react";
import { Icon } from "semantic-ui-react";

import "./style.css";

const HomeProgramRow = ({ title, movieIds }) => {

    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const rowRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const apikey = process.env.REACT_APP_OMDB_API_KEY;

                if (!apikey) {
                    console.error("API Key is missing! Check your .env file.");
                    setLoading(false);
                    return;
                }

                if (!movieIds || movieIds.length === 0) {
                    console.error("No movie IDs provided");
                    setLoading(false);
                    return;
                }

                // Fetch all movies in parallel
                const promises = movieIds.map(id =>
                    fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`)
                        .then(res => res.json())
                );

                const results = await Promise.all(promises);

                // Filter out any failed requests
                const validMovies = results.filter(movie => movie.Response === "True");
                setPrograms(validMovies);
                setLoading(false);

            } catch (error) {
                console.error('Fetch error: ', error);
                setLoading(false);
            };
        };
        fetchData();
    }, [movieIds]);

    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = 300;
            rowRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <div className="home-program-row-container">
                <span className="loading-text">Loading...</span>
            </div>);
    }

    return (
        <>
            <div className="home-program-row-container">
                <h2 className="home-program-row-title">{title}</h2>
                <div className="row-wrapper">
                    <button className="scroll-button left" onClick={() => scroll('left')}>
                        <Icon name="chevron left" size="large" />
                    </button>
                    <div className="home-program-row" ref={rowRef}>
                        {programs.map((program) => (
                            <div key={program.imdbID} className="home-program-card">
                                <img src={program.Poster} alt={program.Title} />
                            </div>
                        ))}
                    </div>
                    <button className="scroll-button right" onClick={() => scroll('right')}>
                        <Icon name="chevron right" size="large" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default HomeProgramRow;