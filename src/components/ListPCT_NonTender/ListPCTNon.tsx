'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ListPCTNon.css';
import Link from 'next/link';

type NonTender = {
  _id: string;
  kodePaket: string;
  namaPaket: string;
  rencanaUmumPengadaan: {
    kodeRUP: string;
    namaPaket: string;
    sumberDana: string;
  };
  tanggalPembuatan: string; // format: "YYYY-MM-DD"
  instansi: string;
  satuanKerja: string;
  jenisPengadaan: string;
  metodePengadaan: string;
  tahunAnggaran: string; // misal: "APBD 2025"
  nilaiPaguPaket: number;
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

export default function ListPCTNon({ filters }: ListProps) {
  const [records, setRecords] = useState<NonTender[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch('/api/pctnontender');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecords();
  }, []);

  const filteredRecords = records.filter((record) => {
    const searchMatch = filters.search
      ? record.namaPaket.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    const instansiMatch = filters.instansi
      ? record.instansi.toLowerCase().includes(filters.instansi.toLowerCase())
      : true;

    const jenisMatch = filters.jenis
      ? record.jenisPengadaan === filters.jenis
      : true;

    return searchMatch && instansiMatch && jenisMatch;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="list-container">
    <h1 className="list-title">Daftar Pencatatan Non Tender</h1>
    <div className="table-wrapper">
      <table className="tender-table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Tender</th>
            <th>Instansi</th>
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
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-message">
                    Tidak ada data yang cocok dengan filter yang dipilih.
                  </div>
                </td>
              </tr>
            ) : (
              currentRecords.map((records) => (
                <tr key={records._id} className="tender-row">
                  <td>{records.kodePaket}</td>
                  <td>
                    <Link href={`/pct_nontender/${records._id}`} className="tender-link">
                      {records.namaPaket}
                    </Link><br />
                      <p className='detailpaket'>Jasa Konsultansi Badan Usaha Konstruksi - TA 2025,2026,2027 - Seleksi - Prakualifikasi Dua File Kualitas dan Biaya
                       Nilai Kontrak : Nilai Kontrak belum dibuat</p>
                  </td>
                  <td>{records.instansi}</td>

                  <td className='Harga'>{records.nilaiPaguPaket.toLocaleString('id-ID')}</td>
                  <td>{records.status}</td>
                </tr>
              ))
            )}
          </motion.tbody>
        </AnimatePresence>
      </table>
    </div>

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
