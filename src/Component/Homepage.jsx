import { useContext } from "react";
import UserContext from "./UserContext";
import { Container } from "react-bootstrap";
import { useCartCount } from "../Hook/CartCount";

function Home () {
    const { user } = useContext(UserContext);

    const cartCount = useCartCount();

    return (
        <Container>
            <h1> Welcome, {user.name}!</h1>
            <p>You are now {user.isLoggedIn ? "logged in" : "logged out"}</p>
            <p>Your cart has {cartCount} item(s).</p>
        </Container>
    );
}

export default Home;