import React, { useEffect, useState } from 'react';
import { userAxios } from '../api/axiosConfig';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
    contact: ''
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userAxios.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    try {
      if (selectedUserId) {
        const confirm = window.confirm("Update this user?");
        if (!confirm) return;
        await userAxios.put(`/users/${selectedUserId}`, formData);
      } else {
        await userAxios.post('/users', formData);
      }

      fetchUsers();
      resetForm();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirm = window.confirm("Delete this user?");
    if (!confirm) return;
    try {
      await userAxios.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      contact: user.contact
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'Admin',
      contact: ''
    });
    setSelectedUserId(null);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

      <form onSubmit={handleAddOrUpdateUser} className="grid md:grid-cols-3 gap-4 mb-6 bg-white p-6 shadow rounded-lg">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" required />
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="border p-2 rounded" />
        <select name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded">
          <option>Admin</option>
          <option>Moderator</option>
          <option>Stock Manager</option>
        </select>
        <div className="col-span-full flex justify-end gap-3">
          <button type="submit" className={`${selectedUserId ? 'bg-yellow-500' : 'bg-blue-600'} text-white px-6 py-2 rounded`}>
            {selectedUserId ? 'Save' : 'Add User'}
          </button>
          {selectedUserId && (
            <button type="button" onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          )}
        </div>
      </form>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4 text-gray-400">No users found.</td></tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectUser(user)}>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.contact}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user.id);
                      }}
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

export default Users;
