import { useState, useContext, useEffect } from "react";
import UserContext from "../Component/UserContext";

export const useCartCount = () => {
    const [cartCount, setCartCount] = useState(0);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setCartCount((currentCount) => currentCount + 1);
        }, 1000);
    
        return () => clearInterval(interval);
    }, [user]);
    return cartCount;
}