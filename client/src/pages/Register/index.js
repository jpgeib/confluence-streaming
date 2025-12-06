import React from "react";

import "./style.css";

const Register = () => {
    return (
        <div className="register-container">
            <h1>Register Page</h1>
            <form className="register-form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;