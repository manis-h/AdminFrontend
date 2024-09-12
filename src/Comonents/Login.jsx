import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { userAuthentication } from "../Redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmailModal from "./Modal";
import OTPModal from "./OTPModal";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [formData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [email, setEmail] = useState("");

    const handleCloseEmailModal = () => setShowEmailModal(false);
    const handleShowEmailModal = () => setShowEmailModal(true);

    const handleCloseOtpModal = () => setShowOtpModal(false);
    const handleShowOtpModal = () => setShowOtpModal(true);

    const handleEmailSubmit = (submittedEmail) => {
        setEmail(submittedEmail);
        handleCloseEmailModal();
        handleShowOtpModal();
    };

    const handleOtpSubmit = async (otp) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/verify?email=${email}`,
                { otp }
            );
            console.log(response.data);
            handleCloseOtpModal();
            navigate(`/reset-password/${response.data.id}`);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Invalid OTP", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleShowOtpModal();
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login form submission logic here
        dispatch(userAuthentication(formData))
            .then((res) => {
                if (res.type === "USER_LOGIN_SUCCESS") {
                    navigate("/");
                }
                if (res.type === "USER_LOGIN_SUCCESS") {
                    toast.success("Login Succesfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (res.type === "USER_LOGIN_FAILURE") {
                    // Assuming the failure type is "USER_LOGIN_FAILURE"
                    toast.error("Something went wrong", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <>
            <div className="register-container w-50">
                <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                        <label htmlFor="loginUsername">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="loginUsername"
                            name="userId"
                            value={formData.userId}
                            onChange={handleLoginChange}
                            placeholder="Please enter"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            name="password"
                            value={formData.password}
                            onChange={handleLoginChange}
                            placeholder="Please enter"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-login">
                        Login
                    </button>
                </form>
            </div>
            <a
                href="#"
                style={{ textDecoration: "none" }}
                onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    handleShowEmailModal();
                }}
            >
                Forget Password?
            </a>
            {/* Modal component */}
            <EmailModal
                show={showEmailModal}
                handleClose={() => handleCloseEmailModal()}
                handleEmailSubmit={handleEmailSubmit}
            />
            <OTPModal
                show={showOtpModal}
                handleClose={() => handleCloseOtpModal()}
                handleOtpSubmit={handleOtpSubmit}
            />
        </>
    );
};

export default Login;
