import React, { useEffect } from "react";
import { axiosInstance } from "../../utils/api";
import MovieCard from "../../components/MovieCard";
import HomeProgramRow from "../../components/HomeProgramRow";

import "./style.css";

const Home = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/test");
                console.log(res.data);
            } catch (error) {
                console.error(error);
            };
        };
        fetchData();
    }, []);

    return (
        <div id="home-container">
            <h1 id="home-header">Home</h1>
            {/* <MovieCard /> */}
            <HomeProgramRow
                title="Action Movies"
                movieIds={["tt0076759", "tt0080684", "tt0086190", "tt0468569", "tt0137523"]}
            />
            <HomeProgramRow
                title="Drama"
                movieIds={["tt0111161", "tt0068646", "tt0071562", "tt0110912"]}
            />
        </div>
    );
};

export default Home;