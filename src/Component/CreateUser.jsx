import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "./UserContext";
import { Container, Form, Button } from "react-bootstrap";

function Register() {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const user = {
            name: formData.username,
            isLoggedIn: true,
            email: formData.email,
        };

        sessionStorage.setItem('userSession', JSON.stringify(user));
        setUser(user);

        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        navigate('/home');
    };

    return (
        <Container>
            <h2>Create A New Account</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="usernameInput">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Enter username"
                    onChange={handleChange}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="emailInput">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="passwordInput">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="confirmPasswordInput">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm password"
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>
        </Container>
    );
};

export default Register;