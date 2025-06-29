import React from 'react';

const stockData = [
  { id: 'P001', name: 'Product A', stock: 5, reorderLevel: 10 },
  { id: 'P002', name: 'Product B', stock: 15, reorderLevel: 15 },
  { id: 'P003', name: 'Product C', stock: 25, reorderLevel: 20 }
];

const Alerts = () => {
  const lowStock = stockData.filter(item => item.stock <= item.reorderLevel);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Low Stock Alerts</h2>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Current Stock</th>
              <th className="px-4 py-2">Reorder Level</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">All products are sufficiently stocked.</td>
              </tr>
            ) : (
              lowStock.map((item, index) => (
                <tr key={index} className="border-t text-sm">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.stock}</td>
                  <td className="px-4 py-2">{item.reorderLevel}</td>
                  <td className="px-4 py-2 text-red-600 font-semibold">Low Stock</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alerts;
