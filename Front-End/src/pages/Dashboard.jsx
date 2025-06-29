import React, { useEffect, useState } from 'react';
import { productAxios } from '../api/axiosConfig'; // Adjust paths as necessary
import { orderAxios } from '../api/axiosConfig';     // Adjust paths as necessary
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const Dashboard = ({ role }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Total products
      const productRes = await productAxios.get('/products');
      const products = productRes.data;
      setTotalProducts(products.length);

      const lowStockCount = products.filter(p => p.quantity < 10).length;
      setLowStock(lowStockCount);

      // Orders today
      const orderRes = await orderAxios.get('/orders');
      const orders = orderRes.data;
      const today = new Date().toISOString().slice(0, 10);
      const todaysOrders = orders.filter(order =>
        order.date?.startsWith(today)
      );
      setOrdersToday(todaysOrders.length);

      // Dummy chart data
      const sample = [
        { date: 'Mon', stock: 120 },
        { date: 'Tue', stock: 150 },
        { date: 'Wed', stock: 98 },
        { date: 'Thu', stock: 135 },
        { date: 'Fri', stock: 100 },
      ];
      setChartData(sample);
    } catch (error) {
      console.error('Error loading dashboard data', error);
    }
  };

  return (
    <div>
      {/* Welcome */}
      <div className="flex justify-end items-center mb-6">
        <span className="text-2xl font-bold text-gray-800 mr-2">
          Welcome, {role}!
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"
          />
        </svg>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg text-gray-500 mb-1">Total Products</h2>
          <p className="text-3xl font-semibold text-blue-600">{totalProducts}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg text-gray-500 mb-1">Low Stock</h2>
          <p className="text-3xl font-semibold text-red-500">{lowStock}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg text-gray-500 mb-1">Orders Today</h2>
          <p className="text-3xl font-semibold text-green-500">{ordersToday}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Stock Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="stock" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
