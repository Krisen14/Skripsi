// page.tsx or ListTender.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import './ListNonTender.css';

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

export default function ListTender({ filters }: ListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get('page') || '1');
    const limitFromParams = parseInt(searchParams.get('limit') || '20');
    setCurrentPage(pageFromParams);
    setItemsPerPage(limitFromParams);
  }, [searchParams]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/nontender');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const updateQueryParams = (page: number, limit: number) => {
    router.push(`?page=${page}&limit=${limit}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updateQueryParams(page, itemsPerPage);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1);
    updateQueryParams(1, newLimit);
  };

  return (
    <div className="list-container">
      <h1 className="list-title">Daftar Non Tender LPSE</h1>
      <div className="table-wrapper">
        <table className="tender-table">
          <thead>
            <tr>
            <th className='kode-paket'>Kode</th>
              <th>Nama Tender</th>
              <th>Instansi</th>
              <th>Tahapan</th>
              <th>Nilai Pagu</th>
              <th>Status</th>
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
                      <Link href={`/nontender/${user._id}`} className="tender-link">
                        {user.namaTender}
                      </Link>
                      <br />
                      <p className="detailpaket">
                        Jasa Konsultansi Badan Usaha Konstruksi - TA 2025,2026,2027 - Seleksi -
                        Prakualifikasi Dua File Kualitas dan Biaya Nilai Kontrak : Nilai Kontrak belum dibuat
                      </p>
                    </td>
                    <td>{user.instansi}</td>
                    <td>
                      <Link
                        href={`/tahapan/${encodeURIComponent(user.tahapan)}`}
                        className="tender-link"
                      >
                        {user.tahapan}
                      </Link>
                    </td>
                    <td className="Harga">Rp {user.nilaiPagu.toLocaleString('id-ID')}</td>
                    <td>{user.status}</td>
                  </tr>
                ))
              )}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>

      <div className="pagination-container">
        <label className='labelbawah'htmlFor="limitSelect">Tampilkan: </label>
        <select className='limitSelect' value={itemsPerPage} onChange={handleLimitChange}>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <button className='pagination-button' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          className="page-input"
        />

        <span className='kalimatbawah'> / {totalPages}</span>

        <button className='pagination-button' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
