import React from "react";

import "./style.css";

const ForgotPassword = () => {
    return (
        <div id="forgot-container">
            <h1 id="forgot-header">Forgot Password Page</h1>
            <form id="forgot-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <button id="forgot-btn" type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;