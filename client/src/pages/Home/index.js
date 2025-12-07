import React, { useEffect } from "react";
import { axiosInstance } from "../../utils/api";

import "./style.css";

const Home = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("");
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
        </div>
    );
};

export default Home;