'use client';

import { useState } from 'react';
import TenderDetailLayout from "@/components/DetailLayout/DetailLayout";
import { motion } from 'framer-motion';
import './jadwal.css';

const scheduleData = [
  { no: 1, tahap: 'Pengumuman Pascakualifikasi' },
  { no: 2, tahap: 'Download Dokumen Pemilihan' },
  { no: 3, tahap: 'Pemberian Penjelasan' },
  { no: 4, tahap: 'Upload Dokumen Penawaran' },
  { no: 5, tahap: 'Pembukaan Dokumen Penawaran' },
  { no: 6, tahap: 'Evaluasi Administrasi, Kualifikasi, Teknis, dan Harga' },
  { no: 7, tahap: 'Pembuktian Kualifikasi' },
  { no: 8, tahap: 'Penetapan Pemenang' },
  { no: 9, tahap: 'Pengumuman Pemenang' },
  { no: 10, tahap: 'Masa Sanggah' },
  { no: 11, tahap: 'Surat Penunjukan Penyedia Barang/Jasa' },
  { no: 12, tahap: 'Penandatanganan Kontrak' },
];

const datetime = '30 September 2024 17:00';

export default function Kontrak() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(scheduleData.length / pageSize);

  const currentData = scheduleData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <TenderDetailLayout>
      <motion.div
        className="schedule-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="#" className="schedule-back-link">
          &lt;-- Kembali Ke Halaman Cari Paket
        </a>
        <h2 className="schedule-title">Daftar Jadwal</h2>
        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Tahap</th>
                <th>Mulai</th>
                <th>Sampai</th>
                <th>Perubahan</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.no}>
                  <td>{item.no}</td>
                  <td>{item.tahap}</td>
                  <td>{datetime}</td>
                  <td>{datetime}</td>
                  <td>Tidak Ada</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="schedule-page-number">Halaman {currentPage} dari {totalPages}</span>

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </motion.div>
    </TenderDetailLayout>
  );
}
