import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CRUDProducts from '../Component/CRUDProducts';
import axios from 'axios';

jest.mock('axios');
    const mockProducts = [
    { id: 1, title: 'Product 1', price: 10 },
    { id: 2, title: 'Product 2', price: 20 }
    ];

    test('renders product list', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    render(<CRUDProducts />);

    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
    await waitFor(() => {
        mockProducts.forEach((product) => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
        });
    });
    });

    test('creates a new product', async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({});

    render(<CRUDProducts />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '30' } });
    fireEvent.click(screen.getByText('Add Product'));

    expect(axios.post).toHaveBeenCalledWith('https://fakestoreapi.com/products', {
        title: 'New Product',
        price: '30'
    });
    });

    test('updates a product', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    axios.put.mockResolvedValue({});

    render(<CRUDProducts />);

    await waitFor(() => {
        fireEvent.click(screen.getAllByText('Edit')[0]);
    });

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Product' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '50' } });
    fireEvent.click(screen.getByText('Update Product'));

    expect(axios.put).toHaveBeenCalledWith('https://fakestoreapi.com/products/1', {
        id: 1,
        title: 'Updated Product',
        price: '50'
    });
    });

    test('deletes a product', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    axios.delete.mockResolvedValue({});

    render(<CRUDProducts />);

    await waitFor(() => {
        fireEvent.click(screen.getAllByText('Delete')[0]);
    });

    expect(axios.delete).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
    });

