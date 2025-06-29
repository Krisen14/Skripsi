'use client';

import React, { useState } from 'react';
import RegistPage from '../RegForm/page';
import LoginForm from '../LoginForm/LoginForm';
import LoginFormNonPenyedia from '../LoginForm/LoginFormNonPenyedia';
import './AuthTabs.css';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginType, setLoginType] = useState<'penyedia' | 'nonPenyedia'>('penyedia');

  const getLoginLabel = () => {
    return loginType === 'penyedia' ? 'Penyedia' : 'Non Penyedia';
  };

  return (
    <div className="auth-tabs">
      {/* Tombol LOGIN & REGISTRASI */}
      <div className="tab-switcher-wrapper">
        <div className="tab-switcher">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            REGISTRASI
          </button>
        </div>
      </div>

      <div className="tab-content">
      <div className="login-as-label">
              
            </div>
        {activeTab === 'login' ? (
          <>
          <p><strong>Kamu login sebagai </strong></p>
            <div className="segmented-button-group">
              <button
                className={`segmented-button ${loginType === 'penyedia' ? 'active' : ''}`}
                onClick={() => setLoginType('penyedia')}
              >
                Login Penyedia
              </button>
              <button
                className={`segmented-button-kanan ${loginType === 'nonPenyedia' ? 'active' : ''}`}
                onClick={() => setLoginType('nonPenyedia')}
              >
                Login Non Penyedia
              </button>
            </div>

            {/* Tambahkan teks ini */}
            <div className="login-as-label">
              <p>LOGIN <strong>{getLoginLabel()}</strong></p>
            </div>

            {loginType === 'penyedia' ? <LoginForm /> : <LoginFormNonPenyedia />}
          </>
        ) : (
          <RegistPage />
        )}
      </div>
    </div>
  );
};

export default AuthTabs;
