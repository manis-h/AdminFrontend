import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const params = useParams();
    console.log(params);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handlePasswordSubmit = (e) => {
        console.log(formData);
    };

    // const handleLoginSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle login form submission logic here
    //     dispatch(userAuthentication(formData))
    //         .then((res) => {
    //             if (res.type === "USER_LOGIN_SUCCESS") {
    //                 navigate("/");
    //             }
    //             if (res.type === "USER_LOGIN_SUCCESS") {
    //                 toast.success("Login Succesfully", {
    //                     position: "top-right",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                 });
    //             } else if (res.type === "USER_LOGIN_FAILURE") {
    //                 // Assuming the failure type is "USER_LOGIN_FAILURE"
    //                 toast.error("Something went wrong", {
    //                     position: "top-right",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // };
    return (
        <>
            <div className="register-container w-50">
                <form onSubmit={handlePasswordSubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="New Password"
                            value={formData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Please enter"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Please enter"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-login">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
