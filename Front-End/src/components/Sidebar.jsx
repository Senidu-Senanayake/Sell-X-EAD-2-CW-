import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { LogOut } from 'lucide-react'; // optional icon lib

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen flex flex-col justify-between bg-gray-800 text-white p-5">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Sell-X</h2>
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link></li>

          {(role === 'Admin' || role === 'Moderator') && (
            <li><Link to="/products" className="hover:text-yellow-300">Products</Link></li>
          )}

          {(role === 'Admin' || role === 'Stock Manager') && (
            <li><Link to="/stock" className="hover:text-yellow-300">Stock Management</Link></li>
          )}

          {(role === 'Admin' || role === 'Moderator') && (
            <li><Link to="/orders" className="hover:text-yellow-300">Orders</Link></li>
          )}

          {(role === 'Admin' || role === 'Moderator' || role === 'Stock Manager') && (
            <li><Link to="/alerts" className="hover:text-yellow-300">Alerts</Link></li>
          )}

          {role === 'Admin' && (
            <li><Link to="/users" className="hover:text-yellow-300">Users</Link></li>
          )}

          <li><Link to="/settings" className="hover:text-yellow-300">Settings</Link></li>
        </ul>
      </div>

      {/* Sign Out Button */}
      <div className="border-t border-gray-600 pt-4 mt-6">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 text-red-400 hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
