import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { axiosInstance } from "../utils/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);
    const navigate = useNavigate();

    const register = async (inputs) => {
        try {
            await axiosInstance.post("/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        }
    };

    const login = async (inputs) => {
        try {
            const response = await axiosInstance.post("/auth/login", inputs);
            setCurrentUser(response.data);
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            navigate("/channels");
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            setCurrentUser(null);
            localStorage.removeItem("currentUser");
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const forgotPassword = async (email) => {
        try {
            await axiosInstance.post("/auth/forgot", { email });
        } catch (err) {
            console.error("Forgot Password error:", err);
            throw err;
        }
    };

    const resetPassword = async (id, token, newPassword) => {
        try {
            await axiosInstance.post(`/auth/reset/${id}/${token}`, { password: newPassword });
            navigate("/login");
        } catch (err) {
            console.error("Reset Password error:", err);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};