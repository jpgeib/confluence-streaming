import React, { useState, useEffect } from "react";

import "./style.css";

const HomeProgramRow = ({ title, movieIds }) => {

    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);


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

    if (loading) {
        return <div className="home-program-row-container">Loading...</div>;
    }

    return (
        <>
            <div className="home-program-row-container">
                <h2>{title}</h2>
                <div className="home-program-row">
                    {programs.map((program) => (
                        <div key={program.imdbID} className="home-program-card">
                            <h3 className="movie-card-header">{program.Title}</h3>
                            <img src={program.Poster} alt={program.Title} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomeProgramRow;