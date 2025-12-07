import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";

const ResetPassword = (props) => {

    const { resetPassword } = props.auth;
    const navigate = useNavigate();
    const { userId, token } = useParams();

    const [inputs, setInputs] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.newPassword !== inputs.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }
        try {
            await resetPassword(userId, token, inputs);
            setSubmitted(true);
        } catch (error) {
            setError("Password reset failed. Please try again.");
        }
    };

    console.log("Reset Password inputs:", inputs);

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [submitted, navigate]);

    if (submitted) {
        return (
            <div id="reset-container">
                <h1 id="reset-header">Password Reset Successful!</h1>
                <p>Redirecting to login page...</p>
            </div>
        );
    }

    return (
        <div id="reset-container">
            <h1 id="reset-header">Reset Password Page</h1>
            <form onSubmit={handleSubmit} id="reset-form">
                <label htmlFor="newPassword">New Password:</label>
                <input onChange={handleChange} type="password" id="new-password" name="newPassword" required />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input onChange={handleChange} type="password" id="confirm-password" name="confirmPassword" required />

                <button id="reset-password-btn" type="submit">Reset Password</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ResetPassword;