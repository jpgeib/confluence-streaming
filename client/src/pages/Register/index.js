import React from "react";

import "./style.css";

const Register = () => {
    return (
        <div id="register-container">
            <h1 id="register-header">Register Page</h1>
            <form id="register-form">
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
        </div>
    );
};

export default Register;