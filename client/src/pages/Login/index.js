import React from "react";

import "./style.css";

const Login = () => {
    return (
        <div id="login-container">
            <h1 id="login-header">Login</h1>
            <form id="login-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button id="login-btn" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;