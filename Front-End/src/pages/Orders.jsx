import React, { useEffect, useState } from 'react';
import { orderAxios, productAxios } from '../api/axiosConfig';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ productId: '', quantity: '' });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await orderAxios.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await productAxios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const confirm = window.confirm("Place this order?");
      if (!confirm) return;

      const order = {
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
      };

      await orderAxios.post('/orders', order);
      fetchOrders();
      setFormData({ productId: '', quantity: '' });
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirm = window.confirm("Delete this order?");
    if (!confirm) return;

    try {
      await orderAxios.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  const getProductName = (id) => {
    const product = products.find(p => p.id === id);
    return product ? product.name : 'Unknown';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>

      {/* Order Form */}
      <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-4 mb-6 bg-white p-6 shadow rounded-lg">
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Place Order
        </button>
      </form>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">No orders found.</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{getProductName(order.productId)}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">{order.orderDate?.slice(0, 10)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
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

export default Orders;
