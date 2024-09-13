import { useMemo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, checkout } from "../Slice/CartSlice";
import { Button, ListGroup } from "react-bootstrap";
import { useQueries } from "@tanstack/react-query";

const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart);
    const cartItemIds = Object.keys(cart.items);
    const dispatch = useDispatch();
    const [previousOrders, setPreviousOrders] = useState([]);
    const [ordersWithPrices, setOrdersWithPrices] = useState([]);
    const [checkoutStatus, setCheckoutStatus] = useState(""); // New state for checkout status

    const handleAddItem = useCallback((id) => dispatch(addItem({ id })), [dispatch]);
    const handleRemoveItem = useCallback((id) => dispatch(removeItem({ id })), [dispatch]);
    const handleCheckout = useCallback(async () => {
        try {
            await dispatch(checkout()); // Assuming checkout is an async action
            setCheckoutStatus("Order has been processed successfully!");
        } catch (error) {
            setCheckoutStatus("Failed to process order.");
        }
    }, [dispatch]);

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cart.items));
    }, [cart.items]);

    // Fetch previous orders when the component mounts
    useEffect(() => {
        fetch('https://fakestoreapi.com/carts')
            .then(res => res.json())
            .then(json => {
                setPreviousOrders(json);
                calculateOrderPrices(json);
            })
            .catch(err => console.error("Error fetching previous orders:", err));
    }, []);

    const calculateOrderPrices = async (orders) => {
        const updatedOrders = await Promise.all(orders.map(async (order) => {
            let total = 0;
            for (const item of order.products) {
                const product = await fetch(`https://fakestoreapi.com/products/${item.productId}`).then(res => res.json());
                total += product.price * item.quantity;
            }
            return { ...order, totalPrice: total };
        }));
        setOrdersWithPrices(updatedOrders);
    };

    const productQueries = useQueries({
        queries: cartItemIds.map(id => ({
            queryKey: ['product', id],
            queryFn: () => fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
        }))
    });

    const getProductName = useCallback((id) => {
        const index = cartItemIds.findIndex(itemId => itemId == id);
        const productQuery = productQueries[index];
        return productQuery?.data?.title || 'Unknown product';
    }, [productQueries, cartItemIds]);

    const productNames = useMemo(() =>
        cartItemIds.reduce((acc, id) => ({
            ...acc,
            [id]: getProductName(id)
        }), {}),
        [cartItemIds, getProductName]);

    const totalPrice = useMemo(() => {
        return cartItemIds.reduce((total, id) => {
            const index = cartItemIds.findIndex(itemId => itemId === id);
            const productQuery = productQueries[index];

            if (productQuery.isSuccess && productQuery.data) {
                const productPrice = productQuery.data.price;
                const quantity = cart.items[id];
                return total + (productPrice * quantity);
            }
            return total;
        }, 0);
    }, [cart.items, cartItemIds, productQueries]);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ListGroup>
                {Object.entries(cart.items).map(([id, quantity]) => (
                    <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
                        <span>{productNames[id]} - Quantity: {quantity}</span>
                        <div>
                            <Button variant="success" onClick={() => handleAddItem(id)}>+</Button>
                            <Button variant="danger" onClick={() => handleRemoveItem(id)}>-</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <p>Total Items: {cart.totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
            <Link to="/home">
                <Button variant="secondary" className="ms-2">Return to Home</Button>
            </Link>

            {checkoutStatus && (
                <div className="alert alert-info mt-3">
                    {checkoutStatus}
                </div>
            )}

            <h3>Previous Orders</h3>
            {ordersWithPrices.length === 0 ? (
                <p>Loading previous orders...</p>
            ) : (
                <ListGroup>
                    {ordersWithPrices.map(order => (
                        <ListGroup.Item key={order.id}>
                            <p>Order ID: {order.id}</p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Total Items: {order.products.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default ShoppingCart;