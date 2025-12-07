import React from "react";
//import { axiosInstance } from "../../utils/api";
import { useState, useEffect } from 'react';

import "./style.css";

const MovieCard = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Array of 20 IMDb IDs for popular movies
    const movieIds = [
        "tt0076759", // Star Wars
        "tt0080684", // The Empire Strikes Back
        "tt0086190", // Return of the Jedi
        "tt0121765", // The Phantom Menace
        "tt0121766", // Attack of the Clones
        "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
        "tt0167260", // The Lord of the Rings: The Return of the King
        "tt0468569", // The Dark Knight
        "tt0137523", // Fight Club
        "tt0110912", // Pulp Fiction
        "tt0109830", // Forrest Gump
        "tt0111161", // The Shawshank Redemption
        "tt0068646", // The Godfather
        "tt0071562", // The Godfather: Part II
        "tt0816692", // Interstellar
        "tt1375666", // Inception
        "tt0133093", // The Matrix
        "tt0114369", // Se7en
        "tt0172495", // Gladiator
        "tt0317248"  // City of God
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apikey = process.env.REACT_APP_OMDB_API_KEY;

                if(!apikey) {
                    console.error("API Key is missing! Check your .env file.");
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
                setMovies(validMovies);
                setLoading(false);

            } catch (error) {
                console.error('Fetch error: ', error);
                setLoading(false);
            };
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="movie-card-container">Loading movies...</div>;
    }

    return (
        <div className="movie-card-container">
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID}>
                        <h3 className="movie-card-header">{movie.Title}</h3>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieCard;