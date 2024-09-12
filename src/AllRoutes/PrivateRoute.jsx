import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { token } = useSelector((store) => store.AuthReducer);
    const { isUserAdmin } = useSelector((store) => store.AuthReducer);

    if (!token || isUserAdmin === false) {
        return <Navigate to="/login" state={{ path: "login" }} replace />;
    }
    return children;
};

export default PrivateRoute;
