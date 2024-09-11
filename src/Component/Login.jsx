import { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigation } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
 

function Login () {
    const [username, setUsername] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigation();

    useEffect(() => {
        const storedUser = localStorage.getItem('userSession');
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
        const userData = { name: username, isLoggedIn: true };
        setUser(userData);
        localStorage.setItem('userSession', JSON.stringify(userData));
    };

    return(
        <Container>
            <Row>
                <Col md={5}>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="usernameInput" classname="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default Login;