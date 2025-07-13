import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCoffee, FaEdit, FaTrash, FaPlus, FaMinus, FaTimes, FaCheck, FaSyncAlt } from 'react-icons/fa';
import './Admin.css'; // We'll create this CSS file

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://cafe-backend-2-7npo.onrender.com/api/product', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const productsData = Array.isArray(response.data?.data) ? response.data.data : [];
      setProducts(productsData);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      setProducts([]);
      console.error('Fetch products error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const config = {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      };

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editingId) {
        await axios.put(`http://localhost:8080/api/product/${editingId}`, formDataToSend, config);
        setSuccess('Product updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/product', formDataToSend, config);
        setSuccess('Product added successfully!');
      }
      await fetchProducts();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      image: null
    });
    setImagePreview('');
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null
    });
    setImagePreview(product.image || '');
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsLoading(true);
      setError('');
      try {
        await axios.delete(`http://localhost:8080/api/product/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setSuccess('Product deleted successfully!');
        await fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete product');
        console.error('Delete error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuantityUpdate = async (id, action) => {
    setIsLoading(true);
    setError('');
    try {
      await axios.put(
        `http://localhost:8080/api/product/${id}`,
        { action },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quantity');
      console.error('Quantity update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-content">
          <h1 className="cafe-title">
            <FaCoffee className="coffee-icon" /> BrewMaster Admin
          </h1>
          <p className="cafe-subtitle">Manage your cafe's products and inventory</p>
        </div>
      </div>

      <div className="admin-content">
        {error && (
          <div className="alert alert-error animate-fade-in">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="alert alert-success animate-fade-in">
            <p>{success}</p>
          </div>
        )}

        <div className="product-form-container">
          <div className="form-card">
            <h2 className="form-title">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Espresso, Cappuccino, etc."
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price*</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Pastry">Pastry</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Stock*</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Description*</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the product..."
                    className="form-textarea"
                    required
                  ></textarea>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Image*</label>
                  <div className="image-upload-container">
                    <label className="file-upload-label">
                      <span className="file-upload-button">Choose File</span>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="file-input"
                        required={!editingId}
                      />
                      <span className="file-upload-text">
                        {formData.image ? formData.image.name : 'No file chosen'}
                      </span>
                    </label>
                    {imagePreview && (
                      <div className="image-preview">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? (
                    <span className="spinner"></span>
                  ) : editingId ? (
                    <>
                      <FaCheck /> Update Product
                    </>
                  ) : (
                    <>
                      <FaPlus /> Add Product
                    </>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                  >
                    <FaTimes /> Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="product-list-container">
          <div className="list-header">
            <h2 className="list-title">Product Inventory</h2>
            <button onClick={fetchProducts} className="btn btn-refresh">
              <FaSyncAlt /> Refresh
            </button>
          </div>

          {isLoading && products.length === 0 ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>No products found</p>
              <button onClick={fetchProducts} className="btn btn-primary">
                Try Again
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="product-row">
                      <td className="product-image-cell">
                        {product.image && (
                          <div className="product-image-wrapper">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product-image"
                            />
                          </div>
                        )}
                      </td>
                      <td className="product-info">
                        <div className="product-name">{product.name}</div>
                        <div className="product-description">{product.description}</div>
                      </td>
                      <td className="product-category">
                        <span className={`category-tag ${product.category.toLowerCase()}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="product-price">
                        ₹{product.price.toFixed(2)}
                      </td>
                      <td className="product-stock">
                        <div className="stock-controls">
                          <button
                            onClick={() => handleQuantityUpdate(product._id, 'decrement')}
                            disabled={product.stock <= 1 || isLoading}
                            className="stock-button"
                          >
                            <FaMinus />
                          </button>
                          <span className="stock-count">{product.stock}</span>
                          <button
                            onClick={() => handleQuantityUpdate(product._id, 'increment')}
                            disabled={isLoading}
                            className="stock-button"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td className="product-actions">
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEdit(product)}
                            disabled={isLoading}
                            className="btn btn-edit"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={isLoading}
                            className="btn btn-delete"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;