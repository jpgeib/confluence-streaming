import React, { useEffect } from "react";
import { axiosInstance } from "../../utils/api";

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
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;