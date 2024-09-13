import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://fakestoreapi.com/products';

function CRUDProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: '' });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createProduct = async () => {
    try {
      await axios.post(apiUrl, newProduct);
      fetchProducts();
      setNewProduct({ title: '', price: '' });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`${apiUrl}/${editProduct.id}`, editProduct);
      fetchProducts();
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <h2>Create Product</h2>
      <input
        type="text"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        placeholder="Title"
      />
      <input
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        placeholder="Price"
      />
      <button onClick={createProduct}>Add Product</button>


      {editProduct && (
        <>
          <h2>Update Product</h2>
          <input
            type="text"
            value={editProduct.title}
            onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
            placeholder="Title"
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            placeholder="Price"
          />
          <button onClick={updateProduct}>Update Product</button>
        </>
      )}


      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.title} - ${product.price}</span>
            <button onClick={() => setEditProduct(product)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CRUDProducts;
