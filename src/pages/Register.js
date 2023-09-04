import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const userData = {
            username,
            email,
            password,
            userTypeId: "USER"
        };

        axios.post('/api/user/register', userData)
            .then(response => {
                console.log(response);
                // setEmail('');
                // setPassword('');
                // setConfirmPassword('');
                // setUsername('');
                navigate("/login");
            })
            .catch(error => {
                alert(error.response.data);
                console.log(error);
            });
    }

    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="mx-auto col-lg-6 align-self-center">
          <Card.Body>
            <Card.Title className="text-center">Register</Card.Title>
            
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="mb-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                    <Form.Label>Retype password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
}

export default Register;
