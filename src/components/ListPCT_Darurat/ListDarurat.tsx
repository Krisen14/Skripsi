'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import './ListDarurat.css';

type User = {
  _id: string;
  kodeTender: string;
  namaTender: string;
  instansi: string;
  satuanKerja: string;
  kategori: string;
  nilaiPagu: number;
  nilaiHps: number;
  metodePemilihan: string;
  tahapan: string;
  tahunAnggaran: number;
  tanggalPengumuman: string;
  status: string;
  peserta: {
    nama: string;
    npwp: string;
    penawaran: number;
    terkualifikasi: boolean;
  }[];
  pemenang: {
    nama: string;
    npwp: string;
    hargaMenang: number;
    tanggalMenang: string;
  };
};

type ListProps = {
  filters: Record<string, string>;
};

export default function ListDarurat({ filters }: ListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/pct_darurat');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Filtering logic
  const filteredUsers = users.filter((user) => {
    const searchMatch = filters.search
      ? user.namaTender.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    const pemenangMatch = filters.pemenang
      ? user.pemenang?.nama?.toLowerCase().includes(filters.pemenang.toLowerCase())
      : true;

    const kategoriMatch = filters.kategori ? user.kategori === filters.kategori : true;
    const instansiMatch = filters.instansi
      ? user.instansi.toLowerCase().includes(filters.instansi.toLowerCase())
      : true;

    const statusMatch = filters.status ? user.status === filters.status : true;
    const tahunMatch = filters.tahun
      ? user.tahunAnggaran.toString() === filters.tahun
      : true;

    return (
      searchMatch &&
      pemenangMatch &&
      kategoriMatch &&
      instansiMatch &&
      statusMatch &&
      tahunMatch
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="list-container">
    <h1 className="list-title">Daftar Pencatatan Darurat</h1>
    <div className="table-wrapper">
      <table className="tender-table">
        <thead>
          <tr>
            <th className='kode-paket'>Kode</th>
            <th>Nama Tender</th>
            <th>Instansi</th>
            <th>Status</th>
            <th>Nilai Pagu</th>
          </tr>
        </thead>

        <AnimatePresence mode="wait">
          <motion.tbody
            key={`${currentPage}-${JSON.stringify(filters)}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-message">
                  Tidak ada data yang cocok dengan filter yang dipilih.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user._id} className="tender-row">
                  <td>{user.kodeTender}</td>
                  <td>
                    <Link href={`/pct_darurat/${user._id}`} className="tender-link">
                      {user.namaTender}
                    </Link><br />
                      <p className='detailpaket'>Jasa Konsultansi Badan Usaha Konstruksi - TA 2025,2026,2027 - Seleksi - Prakualifikasi Dua File Kualitas dan Biaya
                       Nilai Kontrak : Nilai Kontrak belum dibuat</p>
                  </td>
                  <td>{user.instansi}</td>
                  <td>{user.status}</td>
                  <td className='Harga'>Rp {user.nilaiPagu.toLocaleString('id-ID')}</td>
                </tr>
              ))
            )}
          </motion.tbody>
        </AnimatePresence>
      </table>
    </div>

      {/* Pagination Controls */}
      <div className="pagination-container mt-4 flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
