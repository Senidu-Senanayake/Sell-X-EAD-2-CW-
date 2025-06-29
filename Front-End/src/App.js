import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Stock from './pages/Stock';
import Orders from './pages/Orders';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';

const App = () => {
  

  const PrivateLayout = ({ children }) => {

    const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

    return token ? (
      <div className="flex">
        <Sidebar role={role} />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</div>
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateLayout>
              <Products />
            </PrivateLayout>
          }
        />
        <Route
          path="/stock"
          element={
            <PrivateLayout>
              <Stock />
            </PrivateLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateLayout>
              <Orders />
            </PrivateLayout>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateLayout>
              <Alerts />
            </PrivateLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateLayout>
              <Settings />
            </PrivateLayout>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateLayout>
              <Users />
            </PrivateLayout>
          }
        />
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
