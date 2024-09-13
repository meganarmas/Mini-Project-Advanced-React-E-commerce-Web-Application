import { useContext } from "react";
import UserContext from "./UserContext";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useCartCount } from "../Hook/CartCount";
import "./i18n";
import { useTranslation} from 'react-i18next';

function Home () {
    const { user } = useContext(UserContext);

    const cartCount = useCartCount();

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <Container>
            <h1>{t('welcomeMessage')}</h1>
            <p>You are {user.isLoggedIn ? "logged in" : "logged out"}</p>
            <p>Your cart has {cartCount} item(s).</p>

            <Nav as="nav" role="menubar" className="mr-auto">
            <NavLink onClick={() => changeLanguage('en')}>English</NavLink>
            </Nav>
            <Nav as="nav" role="menubar" className="mr-auto">
            <NavLink onClick={() => changeLanguage('kr')}>Korean</NavLink>
            </Nav>
        </Container>
    );
}

export default Home;