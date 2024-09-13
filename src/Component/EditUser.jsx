import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, FormGroup } from 'react-bootstrap';

const UpdateUser = () => {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('userSession');
        if (storedUser) {
            const userSession = JSON.parse(storedUser);
            setFormData({
                username: userSession.name,
                email: userSession.email || '',
                password: '',
                confirmPassword: ''
            });
        }
    }, []);

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
        const updatedUser = {
            name: formData.username,
            email: formData.email,
            isLoggedIn: true
        };

        localStorage.setItem('userSession', JSON.stringify(updatedUser));
        setUser(updatedUser);

        navigate("/home");
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="usernameInput">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Enter new username"
                    onChange={handleChange}
                    required
                    />
                </FormGroup>

                <Form.Group controlId="emailInput">
                    <Form.Label>New Email</Form.Label>
                    <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter new email"
                    onChange={handleChange}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="passwordInput">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter new password"
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
                    placeholder="Confirm new password"
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Button type="submit">Update Profile</Button>
            </Form>
        </Container>
    );
};

export default UpdateUser;