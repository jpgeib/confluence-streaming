import React from "react";
//import { axiosInstance } from "../../utils/api";
import { useState, useEffect } from 'react';

import "./style.css";

const MovieCard = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apikey = process.env.REACT_APP_OMDB_API_KEY;

                if(!apikey) {
                    console.error("API Key is missing! Check your .env file.");
                    return;
                }

                const res = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&t=StarWars`);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                if (data.Search) {
                    setMovies(data.Search);
                } else {
                    console.log("No movies found:", data.Error);
                }

            } catch (error) {
                console.error('Fetch error: ', error);
            };
        };
            fetchData();
        }, []);

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