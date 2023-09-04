import React, { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import "../style/settings.css";

function Settings() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        const idUser = JSON.parse(localStorage.getItem("user")).id;
        axios.put(`/api/user/changePassword/${idUser}`, {oldPassword, newPassword})
            .then(response => {
                setMessage(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setMessage("Failed to change password. Please try again!");
            });
    };

    return (
        <div>
            <AppNavbar />
            <Container>
                <Row className="justify-content-center" id="page-container">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <h1 className="text-center mb-4">Settings</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formOldPassword" className="mb-4">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formNewPassword" className="mb-4">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mb-3" >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Form.Group>

                            {message && <p className="text-warning mb-4">{message}</p>}

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    );
}

export default Settings;
