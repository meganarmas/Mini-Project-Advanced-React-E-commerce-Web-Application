import { Link } from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";
import React from "react";

function NavigationBar() {
    return(
        <Navbar className="navbar" expand="lg">
            <Navbar.Brand as={Link} to="/home">Home</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/login">Login</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/logout">Logout</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/shopping-cart">Shopping Cart</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/products">Products</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/catalog">Product Catalog</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/order-history">Order History</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/create">Register</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/update">Update Account</Navbar.Brand> <br />
            <Navbar.Brand as={Link} to="/delete">Delete Account</Navbar.Brand> <br />
        </Navbar>
    );
}

export default NavigationBar;