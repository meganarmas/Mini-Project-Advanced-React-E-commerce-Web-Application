import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';   

const resources = {
    en: {
        translation: {
            welcomeMessage: "Welcome to the E-Commerce Application!!",
            login: "Login",
            logout: "Logout",
            price: "Price",
            priceLowtoHigh: "Price: Low To High",
        },
    },
    spn: {
        translation: {
            welcomeMessage: "¡Bienvenido al blog de API!",
            login: "",
            logout: "",
            price: "",
            priceLowtoHigh: "",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false, 
        },
    });

export default i18n;