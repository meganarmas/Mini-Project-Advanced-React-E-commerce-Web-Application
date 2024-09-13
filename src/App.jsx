import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ShoppingCart from './Component/ShoppingCart';
import Logout from './Component/Logout';
import Login from './Component/Login';
import Home from './Component/Homepage';
import CRUDProducts from './Component/CRUDProducts';
import FetchApi from './Component/CRUDUser';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserContext from './Component/UserContext';
import NavigationBar from './Component/NavBar';
import { store } from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCatalog from './Component/ProductCatalog';


const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState({ name: '', isLoggedIn: false });
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userSession');
    const storedToken = sessionStorage.getItem('authToken');
    if (storedUser && storedToken) {
      const userSession = JSON.parse(storedUser);
      setUser(userSession);
      setToken(storedToken);
    }
  }, []);

  const ProtectedRoute = ({ element, ...rest }) => {
    return user.isLoggedIn ? element : <Navigate to="/" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/products" element={<CRUDProducts />} />
              <Route path="/catalog" element={<ProductCatalog />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
