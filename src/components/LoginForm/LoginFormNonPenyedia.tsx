'use client';

import { useState } from 'react';
import './LoginForm.css';

export default function LoginFormNonPenyedia() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Login dengan email: ${email}`);
  };

  return (
    <>
    <div className='Body'>
      <p><strong>ID</strong></p>
      <input
        type="email"
        placeholder="Email Non Penyedia"
        className="input-fieldlogin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><p><strong>Password</strong></p>
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
    </>
  );
}
