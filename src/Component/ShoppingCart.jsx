import { useMemo, useCallback } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, checkout } from "../Slice/CartSlice";
import { Button, ListGroup } from 'react-bootstrap';
import { useQueries } from '@tanstack/react-query';

const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart);
    const cartItemIds = Object.keys(cart.items);
    const dispatch = useDispatch();

    const handleAddItems = useCallback((id) => dispatch(addItem({ id })), [dispatch]);
    const handleRemoveItems = useCallback((id) => dispatch(removeItem({ id })), [dispatch]);
    const handleCheckout = useCallback(() => dispatch(checkout()), [dispatch]);

    const productQueries = useQueries({
        queries: cartItemIds.map(id => ({
            queryKey: ['product', id],
            queryFn: () => fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
        }))
    });

    const getProductName = useCallback((id) => {
        const index = cartItemIds.findIndex(itemId => itemId === id);
        const productQuery = productQueries[index];
        return productQuery?.data?.title || "Unknown Product";
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
                            <Button variant="success" onClick={() => handleAddItems(id)}>Add Item</Button>
                            <Button variant="danger" onClick={() => handleRemoveItems(id)}>Remove Item</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <p>Total Items: {cart.totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(3)}</p>
            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
            <Link to="/home">
                <Button variant="secondary" className="ms-2">Return Home</Button>
            </Link>
        </div>
    );
};

export default ShoppingCart;