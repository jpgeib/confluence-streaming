import React from "react";

import "./style.css";

const ResetPassword = () => {
    return (
        <div id="reset-container">
            <h1 id="reset-header">Reset Password Page</h1>
            <form id="reset-form">
                <label htmlFor="new_password">New Password:</label>
                <input type="password" id="new-password" name="new_password" required />

                <label htmlFor="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm_password" required />

                <button id="reset-password-btn" type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;