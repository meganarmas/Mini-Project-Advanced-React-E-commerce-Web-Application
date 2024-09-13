import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../Slice/CartSlice';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import "./i18n";
import { useTranslation} from 'react-i18next';


const fetchProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    if (response.status !== 200) {
        throw new Error('Failed getting all products.');
    }
    return response.data;
};


const fetchCategories = async () => {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    if (response.status !== 200) {
        throw new Error('Failed getting all categories.');
    }
    return response.data;
};

const ProductCatalog = () => {
    const [sortBy, setSortBy] = useState('price_asc');
    const [searchTitle, setSearchTitle] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [sortedProducts, setSortedProducts] = useState([]);
    const dispatch = useDispatch();

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: attemptIndex => Math.max(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000,
        cacheTime: 15 * 60 * 1000
    });

    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: Infinity
    });

    const filterProducts = useCallback((products, searchTitle, minPrice, maxPrice, category) => {
        return products.filter(product => {
            const matchesTitle = product.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) &&
                (!maxPrice || product.price <= parseFloat(maxPrice));
            const matchesCategory = !category || product.category === category;
            return matchesTitle && matchesPrice && matchesCategory;
        });
    }, []);

    const sortProducts = useCallback((products, sortBy) => {
        switch (sortBy) {
            case 'price_asc':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price_desc':
                return [...products].sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    }, []);

    useEffect(() => {
        if (products) {
            const filteredProducts = filterProducts(products, searchTitle, minPrice, maxPrice, category);
            const sortedFilteredProducts = sortProducts(filteredProducts, sortBy);
            setSortedProducts(sortedFilteredProducts);
        }
    }, [products, searchTitle, minPrice, maxPrice, sortBy, category, filterProducts, sortProducts]);

    const handleAddToCart = (id) => {
        dispatch(addItem({ id }));
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };

    return (
        <main>
            <h2>'{t'</h2>
            <h6>Take a second to browse to your heart's content!</h6>

            <section aria-labelledby='categories'>
                <h4 id="categories">Categories</h4>
                <ul>
                    <li>
                        <Button variant='link' onClick={() => handleCategoryChange('')}>All</Button>
                    </li>
                    {categories && categories.map(cat => (
                        <li key={cat}>
                            <Button variant='link' onClick={() => handleCategoryChange(cat)}>{cat}</Button>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby='filters'>
                <h4 id="filters">Filter</h4>
                <Form.Group>
                    <Form.Label>Search by Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchTitle}
                        onChange={handleSearchChange}
                        aria-label='Search by title'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Minimum Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        aria-label='Search minimum price'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Maximum Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        aria-label='Search maximum price'
                    />
                </Form.Group>

                <Form.Select aria-label='Sort Products' value={sortBy} onChange={handleSortChange} style={{ marginTop: '10px', maxWidth: '150px' }}>
                    <option value="price_asc">Low to High</option>
                    <option value="price_desc">High to Low</option>
                </Form.Select>
            </section>

            <section aria-labelledby="products">
                <h4 id="products">Products</h4>
                {isLoading && <p>Loading products...</p>}
                {error && <p>Error loading products: {error.message}</p>}
                <Row>
                    {sortedProducts.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant='top'
                                    src={product.image}
                                    alt={product.title}
                                    style={{ height: '250px', objectFit: 'contain' }}
                                />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Button variant="primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </main>
    );
};

export default ProductCatalog;
