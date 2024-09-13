import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ShoppingCart from './Component/ShoppingCart';
import Logout from './Component/Logout';
import Login from './Component/Login';
import Home from './Component/Homepage';
import CRUDProducts from './Component/CRUDProducts';
import FetchApi from './Component/CRUDUser';
import UserContext from './Component/UserContext';
import NavigationBar from './Component/NavBar';
import ProductCatalog from './Component/ProductCatalog';
import OrderHistory from './Component/OrderHistory';
import DeleteAccount from './Component/DeleteUser';
import Register from './Component/CreateUser';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
              <Route path="/customer-info" element={<FetchApi />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/delete" element={<DeleteAccount />} />
              <Route path="/create" element={<Register />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
