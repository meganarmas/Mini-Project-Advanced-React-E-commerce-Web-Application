import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function NavigationBar() {
    return(
        <Navbar className="navbar-custom" expand="lg" sticky="top">
             <Container fluid>
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand> 
            <Navbar.Brand as={Link} to="/login">Login</Navbar.Brand> 
            <Navbar.Brand as={Link} to="/logout">Logout</Navbar.Brand> 
            <Navbar.Brand as={Link} to="/shopping-cart">Shopping Cart</Navbar.Brand>
            <Navbar.Brand as={Link} to="/products">Products</Navbar.Brand>
            <Navbar.Brand as={Link} to="/catalog">Product Catalog</Navbar.Brand>
            <Navbar.Brand as={Link} to="/order-history">Order History</Navbar.Brand>
            <Navbar.Brand as={Link} to="/create">Register</Navbar.Brand>
            <Navbar.Brand as={Link} to="/update">Update Account</Navbar.Brand>
            <Navbar.Brand as={Link} to="/delete">Delete Account</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;