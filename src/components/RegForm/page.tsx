'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './page.css';

export default function RegistPage() {
  const [email, setEmail] = useState('');
  const [bentukUsaha, setBentukUsaha] = useState('');
  const [status, setStatus] = useState('Pusat');
  const [npwp, setNpwp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const getPasswordStrength = (pass) => {
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const medium = /^.{8,}$/;
    if (strong.test(pass)) return 'strong'; 
    if (medium.test(pass)) return 'medium';
    return 'weak';
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = () => {
    alert('Registrasi berhasil!');
    setEmail('');
    setBentukUsaha('');
    setStatus('Pusat');
    setNpwp('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setTouched({});
  };

  useEffect(() => {
    const newErrors = {};

    if (touched.email && !email.includes('@')) newErrors.email = 'Email tidak valid';
    if (touched.npwp && !/^\d{16}$/.test(npwp)) newErrors.npwp = 'NPWP harus 16 digit angka';
    if (touched.password && password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    if (touched.confirmPassword && password !== confirmPassword) newErrors.confirmPassword = 'Password tidak cocok';
    if (touched.bentukUsaha && !bentukUsaha) newErrors.bentukUsaha = 'Pilih bentuk usaha';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [email, bentukUsaha, status, npwp, password, confirmPassword, touched]);

  return (
    <motion.div
      className="registration-form"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
    >


      <div className="registration-warning-box">
        <div className="warning-title">Ketentuan Pendaftaran</div>
        <ol className="warning-list">
          <li>Wajib melakukan pengecekan NPWP sebelum dapat melanjutkan tahapan pendaftaran yang berikutnya</li>
          <li>Password minimal 8 karakter dan kompleks</li>
          <li>Password harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus</li>
          <li>Indikator Password baru harus berwarna Hijau</li>
        </ol>
      </div>

      <div className="registration-input-row">
        <div className="registration-input-group">
          <input
            type="email"
            placeholder="Masukkan Email Kamu"
            className="registration-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <div className="registration-input-group">
          <input
            type="text"
            placeholder="1234567890123456"
            className="registration-input-npwp"
            value={npwp}
            onChange={(e) => setNpwp(e.target.value.replace(/\D/g, ''))}
            onBlur={() => setTouched(prev => ({ ...prev, npwp: true }))}
            maxLength={16}
          />
          {errors.npwp && <div className="error-text">{errors.npwp}</div>}
        </div>
        <button className="npwp-check-buttons">CEK NPWP</button>
      </div>

      <div className="registration-field">
        <label className="field-label">Password</label>
        <input
          type="password"
          placeholder="Buatlah Password Kamu"
          className="registration-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
        />
        {errors.password && <div className="error-text">{errors.password}</div>}

        <div className="password-strength-container">
          <div className={`strength-bar ${passwordStrength}`} />
          <p className='field-pwstrength'>Password</p>
          <span className={`strength-text ${passwordStrength}`}>
            {passwordStrength === 'strong' ? 'Kuat' : passwordStrength === 'medium' ? 'Sedang' : 'Lemah'}
          </span>
        </div>
      </div>

      <div className="registration-field">
        <label className="field-label">Konfirmasi Password</label>
        <input
          type="password"
          placeholder="Masukkan Kembali Password"
          className="registration-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
        />
        {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
      </div>

      <div className="registration-field-bentuk-usaha">
        <label className="field-label-BU">Bentuk Usaha:</label>
        <select
          className="registration-select"
          value={bentukUsaha}
          onChange={(e) => setBentukUsaha(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, bentukUsaha: true }))}
        >
          <option value="">Pilih</option>
          <option value="pt">PT</option>
          <option value="cv">CV</option>
          <option value="firma">Firma</option>
        </select>
        {errors.bentukUsaha && <div className="error-text">{errors.bentukUsaha}</div>}
      </div>

      <div className="registration-field">
        <label className="field-label">Status:</label>
        <div className="radio-group">
          <label className="status-option">
            <input
              type="radio"
              checked={status === 'Pusat'}
              onChange={() => setStatus('Pusat')}
            /> Pusat
          </label>
          <label className="status-option">
            <input
              type="radio"
              checked={status === 'Cabang'}
              onChange={() => setStatus('Cabang')}
            /> Cabang
          </label>
        </div>
      </div>

      <button
        className="submit-button"
        disabled={!isFormValid}
        onClick={handleSubmit}
        style={{ opacity: isFormValid ? 1 : 0.6 }}
      >
        Lanjutkan Pendaftaran
      </button>
    </motion.div>
  );
}
