import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Comonents/Home";
import Login from "../Comonents/Login";
import ResetPassword from "../Comonents/ResetPassoword";
import RegisteredUsers from "../Comonents/RegisteredUsers";
import AdminUsers from "../Comonents/AdminUsers";
import Withdrawl from "../Comonents/Withdrawl";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/user" element={<Home />} />
            <Route path="/admins" element={<AdminUsers />} />
            <Route path="/withdrawal" element={<Withdrawl />} />
            <Route path="/users" element={<RegisteredUsers />} />
            <Route path="/addaccount" element={<Home />} />
            <Route path="/betresult" element={<Home />} />
            <Route path="/betresultfive" element={<Home />} />
        </Routes>
    );
};
