import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const CRUDProduct = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
    const [editProduct, setEditProduct] = useState(null);
    const [editProductForm, setEditProductForm] = useState({ title: '', price: '', description: '' });

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Add a new product
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://fakestoreapi.com/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ title: '', price: '', description: '' });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Update an existing product
    const updateProduct = async (e) => {
        e.preventDefault();
        if (!editProduct) return;

        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${editProduct.id}`, editProductForm);
            setProducts(products.map(product => product.id === editProduct.id ? response.data : product));
            setEditProduct(null);
            setEditProductForm({ title: '', price: '', description: '' });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Sync editProductForm with selected product for editing
    useEffect(() => {
        if (editProduct) {
            setEditProductForm({
                title: editProduct.title,
                price: editProduct.price,
                description: editProduct.description,
            });
        }
    }, [editProduct]);

    return (
        <Container>
            {/* Add New Product Form */}
            <h2>Add New Product</h2>
            <Form onSubmit={addProduct}>
                <Form.Group controlId="newTitle">
                    <Form.Label>Product Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="newPrice">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="newDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                    />
                </Form.Group>

                <Button type="submit">Add Product</Button>
            </Form>

            {/* Edit Product Form */}
            {editProduct && (
                <>
                    <h2>Edit Product</h2>
                    <Form onSubmit={updateProduct}>
                        <Form.Group controlId="editTitle">
                            <Form.Label>Product Title:</Form.Label>
                            <Form.Control
                                type="text"
                                value={editProductForm.title}
                                onChange={(e) => setEditProductForm({ ...editProductForm, title: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="editPrice">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={editProductForm.price}
                                onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="editDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={editProductForm.description}
                                onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Button type="submit">Update Product</Button>
                    </Form>
                </>
            )}

            {/* Products List */}
            <h2>Products</h2>
            <Row className="mb-4">
                {products.map(product => (
                    <Col key={product.id} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">Price: ${product.price}</Card.Subtitle>
                                <Button variant="warning" onClick={() => setEditProduct(product)}>Edit</Button>
                                <Button variant="danger" onClick={() => deleteProduct(product.id)} className="ms-2">Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CRUDProduct;
