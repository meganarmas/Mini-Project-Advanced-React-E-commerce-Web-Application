import React, { useState, useContext, useEffect } from 'react';
import UserContext from './UserContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('userSession');
        if (storedUser) {
            const userSession = JSON.parse(storedUser);
            setUser(userSession);

            if (userSession.name.toLowerCase() === 'admin') { 
                navigate('/add-product');
            } else {
                navigate('/home');
            }
        }
    }, [navigate, setUser]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate authentication check
        const storedUser = sessionStorage.getItem('userSession');
        const userSession = storedUser ? JSON.parse(storedUser) : null;

        if (userSession && userSession.name === username && userSession.password === password) {
            // Simulate token retrieval from server
            const token = 'dummyToken'; // Replace with actual token from server

            const authenticatedUser = {
                ...userSession,
                token: token
            };

            // Store the authenticated user data with token
            sessionStorage.setItem('userSession', JSON.stringify(authenticatedUser));

            setUser(authenticatedUser);

            if (username.toLowerCase() === 'admin') {
                navigate('/add-product');
            } else {
                navigate('/home');
            }
        } else {
            alert("Invalid username or password!");
        }
    };

    return (
        <Container className="vh-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col md={5}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="passwordInput" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                        <NavLink to="/CreateUser">Create Account</NavLink> <br/>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;