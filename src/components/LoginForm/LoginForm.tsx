'use client';

import { useState } from 'react';
import './LoginForm.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      alert(`Login berhasil sebagai: ${email}`);
      window.location.href = '/'; // Redirect ke homepage
    } else {
      alert('Email dan password harus diisi!');
    }
  };

  return (
    <div className="Body">
      <p><strong>ID/Email</strong></p>
      <input
        type="email"
        placeholder="Email"
        className="input-fieldlogin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p><strong>Password</strong></p>
      <input
        type="password"
        placeholder="Password"
        className="input-fieldlogin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submit-btnlogin" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
