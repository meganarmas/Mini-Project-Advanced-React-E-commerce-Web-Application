// FetchApi.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import FetchApi from '../component/FetchApi';

jest.mock('axios');

describe('FetchApi Component', () => {
    test('fetches and displays products', async () => {
        const mockResponse = {
            data: [
                { id: 1, title: 'Product A', price: '19.99', description: 'This is a test product!' }
            ]
        };
        axios.get.mockResolvedValue(mockResponse);

        render(<FetchApi />);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products');
            expect(screen.getByText('Product A')).toBeInTheDocument();
            expect(screen.getByText('This is a test product!')).toBeInTheDocument();
            expect(screen.getByText('Price: $19.99')).toBeInTheDocument();
        });
    });

    test('creates a new product', async () => {
        const mockProduct = { id: 2, title: 'Product B', price: '29.99', description: 'This is a test for a new product.' };
        axios.post.mockResolvedValue({ data: mockProduct });

        const { getByLabelText, getByText, findByText } = render(<FetchApi />);

        fireEvent.change(getByLabelText(/Product Title:/i), { target: { value: 'Product B' } });
        fireEvent.change(getByLabelText(/Price:/i), { target: { value: '29.99' } });
        fireEvent.change(getByLabelText(/Description:/i), { target: { value: 'This is a test for a new product.' } });
        fireEvent.click(getByText(/Add Product/i));

        await findByText('Product B');

        expect(axios.post).toHaveBeenCalledWith('https://fakestoreapi.com/products', {
            title: 'Product B',
            price: '29.99',
            description: 'This is a test for a new product.'
        });
        expect(screen.getByText('Product B')).toBeInTheDocument();
        expect(screen.getByText('This is a test for a new product.')).toBeInTheDocument();
        expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
    });

    test('edits a product', async () => {
        const initialProducts = [
            { id: 1, title: 'Product C', price: '39.99', description: 'This is the original product.' }
        ];
        const updatedProduct = { id: 1, title: 'Updated Product C', price: '49.99', description: 'This is the updated product!' };

        axios.get.mockResolvedValue({ data: initialProducts });
        axios.put.mockResolvedValue({ data: updatedProduct });

        render(<FetchApi />);

        await waitFor(() => expect(screen.getByText('Product C')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Edit'));
        fireEvent.change(screen.getByLabelText(/Product Title:/i), { target: { value: 'Updated Product C' } });
        fireEvent.change(screen.getByLabelText(/Price:/i), { target: { value: '49.99' } });
        fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'This is the updated product!' } });
        fireEvent.click(screen.getByText(/Update Product/i));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith('https://fakestoreapi.com/products/1', {
                title: 'Updated Product C',
                price: '49.99',
                description: 'This is the updated product!'
            });
            expect(screen.getByText('Updated Product C')).toBeInTheDocument();
            expect(screen.getByText('This is the updated product!')).toBeInTheDocument();
            expect(screen.getByText('Price: $49.99')).toBeInTheDocument();
        });
    });

    test('deletes a product', async () => {
        const initialProducts = [
            { id: 1, title: 'Product D', price: '59.99', description: 'This product will be deleted.' }
        ];
        axios.get.mockResolvedValue({ data: initialProducts });
        axios.delete.mockResolvedValue({});

        render(<FetchApi />);

        await waitFor(() => expect(screen.getByText('Product D')).toBeInTheDocument());

        const deleteButtons = await screen.findAllByText('Delete');
        expect(deleteButtons.length).toBeGreaterThan(0);

        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
            expect(screen.queryByText('Product D')).not.toBeInTheDocument();
        });
    });
});
