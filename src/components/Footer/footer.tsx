'use client';

import React from 'react';
import Image from 'next/image';
import './footer.css';
import gambar from './inaprocwhite.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Informasi Hukum</h4>
          <ul>
            <li><a href="#">Informasi LPSE</a></li>
            <li><a href="#">Link Terkait</a></li>
            <li><a href="#">Kebijakan Privasi</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Sosial Media</h4>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Youtube</a></li>
            <li><a href="#">Facebook</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Menu</h4>
          <ul>
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Cari Paket</a></li>
            <li><a href="#">Konten Khusus</a></li>
            <li><a href="#">Informasi Lainnya</a></li>
            <li><a href="#">Kontak Kami</a></li>
          </ul>
        </div>
        <div className="footer-col-alamat-col">
          <h4 className='AlamatFooter'>Alamat</h4>
          <p>Jl. Kebon Sirih No. 18, Gedung Balaikota Blok H Lantai 19, Jakarta Pusat</p>
          <div className="footer-logo-container">
            <Image 
              src={gambar} 
              alt="INA-PROC SPSE" 
              width={300} 
              height={50} 
              className="footer-logo"
              priority
            />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2025 Copyright LPSE Jakarta</p>
      </div>
    </footer>
  );
};

export default Footer;
