import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Register = (props) => {

    const { register } = props.auth;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
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
            await register(inputs);
            setSubmitted(true);
        } catch (error) {
            setError("Registration failed. Please check your details and try again.");
        }
    };

    console.log("Register inputs:", inputs);

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    if (submitted) {
        return (
            <div id="register-container">
                <h1 id="register-header">Registration Successful!</h1>
                <p>Redirecting to login page...</p>
            </div>
        );
    }

    return (
        <div id="register-container">
            <h1 id="register-header">Register Page</h1>
            <form onSubmit={handleSubmit} id="register-form">
                <label htmlFor="first_name">First Name:</label>
                <input type="text" id="first_name" name="first_name" required />

                <label htmlFor="last_name">Last Name:</label>
                <input type="text" id="last_name" name="last_name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button id="register-btn" type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;