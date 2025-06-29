'use client';
import React from 'react';
import Navbar from "@/components/Navbar/navbar";
import iconImage from './file-icon.png'; // ganti dengan ikon kamu
import Image from 'next/image';
import './page.css';

const resources = [
    {
      title: "Video Tutorial – Pusat Bantuan INARPROC dan E-Katalog Versi 6",
      link: "/docs/video-tutorial.pdf",
    },
    {
      title: "Panduan Pengguna – Pusat Bantuan INARPROC dan E-Katalog Versi 6",
      link: "/docs/panduan-pengguna.pdf",
    },
    {
      title: "Petunjuk Teknis Pendaftaran LPSE",
      link: "/docs/petunjuk-pendaftaran-lpse.pdf",
    },
    {
      title: "Petunjuk Teknis Pendaftaran LPSE Penunjukan",
      link: "/docs/petunjuk-penunjukan.pdf",
    },
    {
      title: "Reset Password Penyedia Mandiri",
      link: "/docs/reset-password.pdf",
    },
    {
      title: "Perubahan Lokasi Verifikasi LPSE",
      link: "/docs/perubahan-verifikasi.pdf",
    },
    {
      title: "Daftar E-Katalog Versi 6",
      link: "/docs/daftar-ekatalog.pdf",
    },
    {
      title: "Panduan Aplikasi E-Katalog Versi 6",
      link: "/docs/panduan-aplikasi.pdf",
    },
    {
      title: "Layanan Pengaduan LPSE Provinsi DKI Jakarta",
      link: "/docs/pengaduan-dki.pdf",
    },
  ];
  

export default function InformasiLainnya(){
    return(
        <div className='Body'>
        <Navbar />
        <h1 className="title-abcd">Informasi LPSE</h1>
        <div className="resource-page">
      <div className="resource-grid">
      <div className="resource-grid">
        {resources.map((item, index) => (
          <div key={index} className="resource-card">
            <Image src="" alt="file icon" width={40} height={40} />
            <p className="resource-title">{item.title}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <button className="resource-button">Klik Disini</button>
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}