import React, { useState } from 'react';

const initialStock = [
  { name: 'Product A', stock: 30, reorderLevel: 10 },
  { name: 'Product B', stock: 5, reorderLevel: 15 },
  { name: 'Product C', stock: 20, reorderLevel: 20 }
];

const Stock = () => {
  const [stockData, setStockData] = useState(initialStock);
  const [updateQty, setUpdateQty] = useState('');

  const handleUpdate = (index) => {
    const newStock = [...stockData];
    const quantity = parseInt(updateQty);
    if (!isNaN(quantity)) {
      newStock[index].stock += quantity;
      setStockData(newStock);
      setUpdateQty('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Stock Management</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Current Stock</th>
              <th className="px-4 py-2">Reorder Level</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Update Qty</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => {
              const status = item.stock <= item.reorderLevel ? 'Low' : 'OK';
              return (
                <tr key={index} className="border-t text-sm">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.stock}</td>
                  <td className="px-4 py-2">{item.reorderLevel}</td>
                  <td className={`px-4 py-2 font-semibold ${status === 'Low' ? 'text-red-500' : 'text-green-600'}`}>
                    {status === 'Low' ? 'Low Stock' : 'In Stock'}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="border p-1 rounded w-24"
                      value={index === stockData.indexOf(item) ? updateQty : ''}
                      onChange={(e) => setUpdateQty(e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdate(index)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
