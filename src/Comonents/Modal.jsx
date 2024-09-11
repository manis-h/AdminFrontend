import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EmailModal = ({ show, handleClose, handleSubmit, email, setEmail }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Your Email</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className="my-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmailModal;
