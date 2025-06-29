'use client';

import React from 'react';
import './page.css'; // Pastikan ini adalah CSS global atau bisa pakai module.css

type GlosariumModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const indikator = [
  {
    no: 1,
    nama: 'Evaluasi Administrasi',
    deskripsi: 'Pemeriksaan kelengkapan dan keabsahan dokumen administrasi peserta.',
  },
  {
    no: 2,
    nama: 'Evaluasi Teknis',
    deskripsi: 'Pemeriksaan kecocokan spesifikasi teknis, metode kerja, dan sumber daya teknis.',
  },
  {
    no: 3,
    nama: 'Evaluasi Kualifikasi',
    deskripsi: 'Penilaian terhadap legalitas, pengalaman, kemampuan keuangan, dll.',
  },
  {
    no: 4,
    nama: 'Pembuktian Kualifikasi',
    deskripsi: 'Pemeriksaan kewajaran dan keworth-it-an harga yang ditawarkan.',
  },
  {
    no: 5,
    nama: 'Skor Kualifikasi',
    deskripsi: 'Pemeriksaan kelengkapan dan keabsahan dokumen administrasi peserta.',
  },
  {
    no: 6,
    nama: 'Skor Pembuktian',
    deskripsi: 'Pemeriksaan kelengkapan dan keabsahan dokumen administrasi peserta.',
  },
  {
    no: 7,
    nama: 'Skor Harga',
    deskripsi: 'Pemeriksaan kelengkapan dan keabsahan dokumen administrasi peserta.',
  },
  {
    no: 8,
    nama: 'Skor Akhir',
    deskripsi: 'Pemeriksaan kelengkapan dan keabsahan dokumen administrasi peserta.',
  },
  {
    no: 9,
    nama: 'Hasil Negosiasi',
    deskripsi: 'Harga akhir setelah proses negosiasi dengan penyedia.',
  },
];

const GlosariumModal: React.FC<GlosariumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="glosarium-overlay" onClick={onClose}>
      <div className="glosarium-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="glosarium-title">GLOSARIUM</h2>
        <p className="glosarium-subtext">
          Setiap tender memiliki indikator evaluasi yang berbeda sesuai dengan ketentuan dan metode pemilihan yang digunakan oleh panitia.
        </p>

        <table className="glosarium-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Indikator</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {indikator.map(({ no, nama, deskripsi }) => (
              <tr key={no}>
                <td>{no}</td>
                <td>{nama}</td>
                <td>{deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="glosarium-footer">
          <button onClick={onClose} className="glosarium-close-button">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlosariumModal;
