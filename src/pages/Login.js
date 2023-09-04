import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../style/login.css';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import { useCurrentUser } from '../provider/CurrentUserProvider';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const {login} = useCurrentUser();

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            username,
            password
        };

        axios.post('/api/user/login', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })        
            .then(response => {
                // console.log(response);
                // console.log(response.data);
                // localStorage.setItem('user', JSON.stringify(response.data));
                // setUser(JSON.stringify(response.data))
                login(response.data)

                if(response.data.userTypeId === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data);
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="mx-auto col-lg-6 align-self-center">
                <Card.Body>
                    <Card.Title className="text-center">Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicusername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <ButtonGroup className='mb-3'>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                            <Button variant="primary" onClick={() => navigate("/register")}>
                                Register
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
