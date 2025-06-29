'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './navbar.css';
import gambar from './pngegg.png';

const AMEL = 'https://lpse.jakarta.go.id/eproc4/amel';
const REGULASI = 'https://jdih.lkpp.go.id/';
const BLACKLIST = 'https://daftar-hitam.inaproc.id/';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdownHukum, setShowDropdownHukum] = useState(false);
  const [showDropdownLainnya, setShowDropdownLainnya] = useState(false);
  const [showDropdownProfile, setShowDropdownProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  useEffect(() => {
    const close = () => {
      setShowDropdownHukum(false);
      setShowDropdownLainnya(false);
    };
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowDropdownProfile(false);
    window.location.href = '/'; // redirect ke halaman utama
  };

  return (
    <div className="header">
      <Link href="/" className="logo">
        <Image src={gambar} alt="LPSE" className="gambar1" />
      </Link>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`header-right ${menuOpen ? 'show' : ''}`}>
        <div className="navbar-link">
          <Link href="/" className="nav-link nav-animated">Beranda</Link>
          <Link href="/caripaket" className="nav-link nav-animated">Cari Paket</Link>

          {/* Informasi Hukum */}
          <div className="dropdown" onMouseLeave={() => setShowDropdownHukum(false)}>
            <span
              className="nav-link nav-animated dropdown-toggle"
              onClick={() => setShowDropdownHukum(!showDropdownHukum)}
              onMouseEnter={() => setShowDropdownHukum(true)}
            >
              Informasi Hukum ▾
            </span>
            <div className={`dropdown-menu ${showDropdownHukum ? 'show' : ''}`}>
              <Link href="/informasilainnya" className="dropdown-item">Persyaratan & Ketentuan</Link>
              <Link href="/halamantutorial" className="dropdown-item">Pakta Integritas</Link>
              <Link href="/kontenkhusus" className="dropdown-item">Dokumen Pendukung</Link>

              <a href={AMEL} target="_blank" rel="noopener noreferrer" className="dropdown-item">Peraturan ↗</a>
              <a href={REGULASI} target="_blank" rel="noopener noreferrer" className="dropdown-item">Surat Edaran ↗</a>
            </div>
          </div>

          {/* Informasi Lainnya */}
          <div className="dropdown" onMouseLeave={() => setShowDropdownLainnya(false)}>
            <span
              className="nav-link nav-animated dropdown-toggle"
              onClick={() => setShowDropdownLainnya(!showDropdownLainnya)}
              onMouseEnter={() => setShowDropdownLainnya(true)}
            >
              Informasi Lainnya ▾
            </span>
            <div className={`dropdown-menu ${showDropdownLainnya ? 'show' : ''}`}>
              <Link href="/informasilainnya" className="dropdown-item">Informasi LPSE</Link>
              <Link href="/halamantutorial" className="dropdown-item">Tutorial Pendaftaran E-Katalog</Link>
              <Link href="/panduan" className="dropdown-item">Panduan Penyedia & Pembeli</Link>
              <Link href="/pengumuman" className="dropdown-item">Pengumuman</Link>

              <a href={AMEL} target="_blank" rel="noopener noreferrer" className="dropdown-item">AMEL ↗</a>
              <a href={REGULASI} target="_blank" rel="noopener noreferrer" className="dropdown-item">Regulasi LKPP ↗</a>
              <a href={BLACKLIST} target="_blank" rel="noopener noreferrer" className="dropdown-item">Daftar Hitam ↗</a>
            </div>
          </div>

          <Link href="/contactus" className="nav-link nav-animated">Kontak Kami</Link>
        </div>

        {/* Bagian login/profile */}
        {isLoggedIn ? (
          <div className="dropdown" onMouseLeave={() => setShowDropdownProfile(false)}>
            <span
              className="button-362"
              onClick={() => setShowDropdownProfile(!showDropdownProfile)}
              onMouseEnter={() => setShowDropdownProfile(true)}
            >
              Profile ▾
            </span>
            <div className={`dropdown-menu2 ${showDropdownProfile ? 'show' : ''}`}>
              <Link href="/profile" className="dropdown-item">Profile</Link>
              <Link href="/profile/Log-Akses" className="dropdown-item">Log Akses</Link>
              <Link href="/profile/Inbox" className="dropdown-item">Inbox</Link>
              <Link href="/profile/Tender-Saya" className="dropdown-item">Tender Saya</Link>
              <Link href="/profile/ganti-password" className="dropdown-item">Ganti Password</Link>
              <button onClick={handleLogout} className="dropdown-item-logout">Logout</button>
            </div>
          </div>
        ) : (
          <Link href="/loginpage" className="button-36">Login / Registrasi</Link>
        )}
      </div>
    </div>
  );
}
