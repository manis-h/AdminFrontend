import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OTPModal = ({ show, handleClose, handleOtpSubmit }) => {
    const [otp, setOtp] = useState("");
    const handleChange = (e, index) => {
        const { value } = e.target;

        if (value.length === 1 && index < 3) {
            document.getElementById(`otp${index + 1}`).focus();
        } else if (value.length === 0 && index > 0) {
            document.getElementById(`otp${index - 1}`).focus();
        }
        setOtp(
            (prevOtp) =>
                prevOtp.slice(0, index) + value + prevOtp.slice(index + 1)
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleOtpSubmit(otp);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>OTP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="otp-container">
                        {[...Array(4)].map((_, index) => (
                            <Form.Control
                                key={index}
                                type="text"
                                maxLength="1"
                                id={`otp${index}`}
                                value={otp[index] || ""}
                                onChange={(e) => handleChange(e, index)}
                                className="otp-input"
                                required
                            />
                        ))}
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default OTPModal;
