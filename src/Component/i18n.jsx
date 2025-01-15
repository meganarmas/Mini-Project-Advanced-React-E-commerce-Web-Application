import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';   

const resources = {
    en: {
        translation: {
            topMessage: "Product Catalog",
            paragraph: "Take a second to browse to your heart's content!",
            categories: "Categories",
            price: "Price",
            priceLowToHigh: "Low To High",
            priceHighToLow: "High to Low",
            maxPrice: "Maximum Price",
            minPrice: "Minimum Price",
            searchByTitle: "Search by Title",
            filter: "Filter",
            welcomeMessage: " Welcome to the E-Commerce App!",
            products: "Products",
            addToCart: "Add to Cart",
            statusLog: "You are {{status}}",
            loggedIn: "logged in",
            loggedOut: "logged out"
        },
    },
    kr: {
        translation: {
            topMessage: "제품 카탈로그",
            paragraph: "잠시 시간을 내어 마음껏 둘러보세요!",
            categories: "카테고리",
            price: "가격",
            priceLowToHigh: "낮음에서 높음",
            priceHighToLow: "높은 가격에서 낮은 가격",
            maxPrice: "최대 가격",
            minPrice: "최소 가격",
            searchByTitle: "제목으로 검색",
            filter: "필터",
            welcomeMessage: "이커머스 앱에 오신 것을 환영합니다!",
            products: "제품",
            addToCart: "장바구니에 추가",
            statusLog: "당신은 {{status}} 상태입니다'",
            loggedIn: "로그인되었습니다",
            loggedOut: "로그아웃되었습니다"
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