import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const userId = 1;
    const queries = useQueries({
        queries: [{
            queryKey: ['orderHistory', userId],
            queryFn: () => fetch(`https://fakestoreapi.com/users/${userId}`).then(res => res.json())
        }]
    });

    const ordersQuery = queries[0];
    const orders = ordersQuery.data ||  [];

    if (ordersQuery.isLoading) return <p>Loading...</p>
    if (ordersQuery.isError) return <p>Error in loading orders!</p>

    return(
        <div>
            <h2>Order History</h2>
            <ListGroup>
                {orders.map(order => (
                    <ListGroup.Item key={order.id}>
                        <div>
                            <p>Order Id: {order.id}</p>
                            <p>Date: {new Data(order.date).toLocaleDataString()}</p>
                            <p>Total Price: ${order.totalPrice}</p>
                        </div>
                        <Link to={`/order-details/${order.id}`}>
                            <Button>View Details</Button>
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
};

export default OrderHistory;