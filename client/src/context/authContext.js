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
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const forgotPassword = async (inputs) => {
        try {
            await axiosInstance.post("/auth/forgot", inputs);
        } catch (err) {
            console.error("Forgot Password error:", err);
            throw err;
        }
    };

    const resetPassword = async (id, token, inputs) => {
        try {
            await axiosInstance.post(`/auth/reset/${id}/${token}`, inputs);
            navigate("/login");
        } catch (err) {
            console.error("Reset Password error:", err);
            throw err;
        }
    };

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};