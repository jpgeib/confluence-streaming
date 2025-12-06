import React from "react";

import "./style.css";

const ForgotPassword = () => {
    return (
        <div className="forgot-password-container">
            <h1>Forgot Password Page</h1>
            <form className="forgot-password-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;