import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Comonents/Home";
import Login from "../Comonents/Login";
import RegisteredUsers from "../Comonents/RegisteredUsers";
import AdminUsers from "../Comonents/AdminUsers";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/user" element={<Home />} />
            <Route path="/admins" element={<AdminUsers />} />
            <Route path="/withdrawl" element={<Home />} />
            <Route path="/users" element={<RegisteredUsers />} />
            <Route path="/addaccount" element={<Home />} />
            <Route path="/betresult" element={<Home />} />
            <Route path="/betresultfive" element={<Home />} />
        </Routes>
    );
};
