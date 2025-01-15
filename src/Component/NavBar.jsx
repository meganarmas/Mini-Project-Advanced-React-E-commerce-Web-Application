import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavigationBar() {
    return (
        <Navbar expand="lg" className="p-2" style={{ width: "100%", backgroundColor: "beige" }}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
                   E-Commerce App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-item-custom">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login" className="nav-item-custom">
                            Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/logout" className="nav-item-custom">
                            Logout
                        </Nav.Link>
                        <Nav.Link as={Link} to="/shopping-cart" className="nav-item-custom">
                            Shopping Cart
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products" className="nav-item-custom">
                            Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog" className="nav-item-custom">
                            Product Catalog
                        </Nav.Link>
                        <Nav.Link as={Link} to="/order-history" className="nav-item-custom">
                            Order History
                        </Nav.Link>
                        <Nav.Link as={Link} to="/create" className="nav-item-custom">
                            Register
                        </Nav.Link>
                        <Nav.Link as={Link} to="/update" className="nav-item-custom">
                            Update Account
                        </Nav.Link>
                        <Nav.Link as={Link} to="/delete" className="nav-item-custom">
                            Delete Account
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
