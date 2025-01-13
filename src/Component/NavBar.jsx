import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function NavigationBar() {
    return(
        <Navbar className="p-2 mb-3" bg="light">
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/home">Home</Navbar.Brand> <br />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/login">Login</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/logout">Logout</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/shopping-cart">Shopping Cart</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/products">Products</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/catalog">Product Catalog</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/order-history">Order History</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/create">Register</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/update">Update Account</Navbar.Brand> <br />
            <Navbar.Brand as={Link} className="navbar-brand-custom" to="/delete">Delete Account</Navbar.Brand> <br />
        </Navbar>
    );
}

export default NavigationBar;
