import React, { useState } from "react";

import "./style.css";
import { set } from "mongoose";

const ForgotPassword = (props) => {

    const { forgotPassword } = props.auth;
    const [inputs, setInputs] = useState({
        email: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(inputs);
            setSubmitted(true);
        } catch (error) {
            setError("Failed to send reset link. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div id="forgot-container">
                <h1 id="forgot-header">Reset Link Sent!</h1>
                <p>Please check your email for the password reset link.</p>
            </div>
        );
    }

    return (
        <div id="forgot-container">
            <h1 id="forgot-header">Forgot Password Page</h1>
            <form id="forgot-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <button id="forgot-btn" type="submit">Send Reset Link</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ForgotPassword;