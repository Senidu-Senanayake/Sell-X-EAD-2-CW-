import React, { useEffect, useState } from 'react';
import { productAxios } from '../api/axiosConfig';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    unitPrice: '',
    stockQuantity: '',
    reorderLevel: ''
  });

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Others'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productAxios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productToSave = {
        ...formData,
        unitPrice: parseFloat(formData.unitPrice),
        stockQuantity: parseInt(formData.stockQuantity),
        reorderLevel: parseInt(formData.reorderLevel),
      };

      if (selectedProductId) {
        const confirm = window.confirm("Update this product?");
        if (!confirm) return;
        await productAxios.put(`/products/${selectedProductId}`, productToSave);
      } else {
        await productAxios.post('/products', productToSave);
      }

      fetchProducts();
      resetForm();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirm = window.confirm("Delete this product?");
    if (!confirm) return;
    try {
      await productAxios.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProductId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      unitPrice: product.unitPrice,
      stockQuantity: product.stockQuantity,
      reorderLevel: product.reorderLevel
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      unitPrice: '',
      stockQuantity: '',
      reorderLevel: ''
    });
    setSelectedProductId(null);
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory ? p.category === filterCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Management</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product Form */}
      <form onSubmit={handleAddOrUpdateProduct} className="grid md:grid-cols-3 gap-4 mb-6 bg-white p-6 shadow rounded-lg">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="border p-2 rounded" required />
        <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleChange} placeholder="Unit Price" className="border p-2 rounded" required />
        <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} placeholder="Stock Quantity" className="border p-2 rounded" required />
        <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} placeholder="Reorder Level" className="border p-2 rounded" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded md:col-span-2" />

        <div className="col-span-full flex justify-end gap-3">
          <button type="submit" className={`${selectedProductId ? 'bg-yellow-500' : 'bg-blue-600'} text-white px-6 py-2 rounded`}>
            {selectedProductId ? 'Save' : 'Add Product'}
          </button>
          {selectedProductId && (
            <button type="button" onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          )}
        </div>
      </form>

      {/* Product Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Reorder</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-4 text-gray-400">No products found.</td></tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectProduct(product)}>
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.unitPrice}</td>
                  <td className="px-4 py-2">{product.stockQuantity}</td>
                  <td className="px-4 py-2">{product.reorderLevel}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
