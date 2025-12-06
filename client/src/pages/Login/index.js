import React from "react";

import "./style.css";

const Login = () => {
    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <form className="login-form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;