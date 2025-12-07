import React, { useEffect } from "react";
import { axiosInstance } from "../../utils/api";
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
            {/* <MovieCard /> */}
            <HomeProgramRow 
                title="Trending Now"
                movieIds={["tt4574334", "tt1405406", "tt7587890", "tt0413573"]}
            />
            <HomeProgramRow 
                title="Recommended For You"
                movieIds={["tt0773262", "tt0373732", "tt0206512", "tt6741278"]}
            />
            <HomeProgramRow
                title="Action"
                movieIds={["tt0076759", "tt0810788", "tt0468569", "tt0137523"]}
            />
            <HomeProgramRow
                title="Drama"
                movieIds={["tt0111161", "tt0068646", "tt10813940", "tt0110912"]}
            />
        </div>
    );
};

export default Home;