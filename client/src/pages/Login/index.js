import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            setSubmitted(true);
        } catch (error) {
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    console.log("Login inputs:", inputs);

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    if (submitted) {
        return (
            <div id="login-container">
                <h1 id="login-header">Login Successful!</h1>
                <p>Redirecting to home page...</p>
            </div>
        );
    }

    return (
        <div id="login-container">
            <h1 id="login-header">Login</h1>
            <form onSubmit={handleSubmit} id="login-form">
                <label htmlFor="email">Email:</label>
                <input onChange={handleChange} type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input onChange={handleChange} type="password" id="password" name="password" required />

                <button id="login-btn" type="submit">Login</button>
                <p id="register-link" onClick={() => navigate("/register")}>Don't have an account? Register here</p>
                <p id="forgot-password-link" onClick={() => navigate("/forgot")}>Forgot Password?</p>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;