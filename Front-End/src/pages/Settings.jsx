import React, { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Senidu Senanayake',
    email: 'admin@example.com',
    role: 'Admin',
    contact: '071-1234567'
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [preferences, setPreferences] = useState({
    theme: 'Light',
    language: 'English'
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlePreferencesChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    alert('Profile updated (not saved to backend)');
  };

  const handleChangePassword = () => {
    if (password.new !== password.confirm) {
      alert('New passwords do not match');
      return;
    }
    alert('Password changed (not saved to backend)');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

      {/* Profile Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Email"
          />
          <div className="p-2">
            <label className="block text-sm text-gray-500 mb-1">Role</label>
            <p className="font-semibold text-gray-800">{profile.role}</p>
          </div>
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Contact"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            name="current"
            value={password.current}
            onChange={handlePasswordChange}
            className="border p-2 rounded"
            placeholder="Current Password"
          />
          <input
            type="password"
            name="new"
            value={password.new}
            onChange={handlePasswordChange}
            className="border p-2 rounded"
            placeholder="New Password"
          />
          <input
            type="password"
            name="confirm"
            value={password.confirm}
            onChange={handlePasswordChange}
            className="border p-2 rounded"
            placeholder="Confirm New Password"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Change Password
        </button>
      </div>

      {/* Preferences */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="theme"
            value={preferences.theme}
            onChange={handlePreferencesChange}
            className="border p-2 rounded"
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
          <select
            name="language"
            value={preferences.language}
            onChange={handlePreferencesChange}
            className="border p-2 rounded"
          >
            <option>English</option>
            <option>සිංහල</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
