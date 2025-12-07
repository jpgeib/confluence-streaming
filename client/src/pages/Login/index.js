import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { set } from "mongoose";

const Login = (props) => {

    const { login } = props.auth;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div id="login-container">
            <h1 id="login-header">Login</h1>
            <form id="login-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button id="login-btn" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;