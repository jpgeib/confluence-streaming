import React from "react";

import "./style.css";

const ResetPassword = () => {
    return (
        <div className="reset-password-container">
            <h1>Reset Password Page</h1>
            <form className="reset-password-form">
                <label htmlFor="new-password">New Password:</label>
                <input type="password" id="new-password" name="new-password" required />

                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" required />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;