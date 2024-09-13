import { useContext, useEffect } from 'react';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('userSession');
        
        if (setUser) {
            setUser({ name: '', isLoggedIn: false });
        }
        navigate('/home');

    }, [navigate, setUser]);

    return <div>Logging out....</div>;
}

export default Logout;
