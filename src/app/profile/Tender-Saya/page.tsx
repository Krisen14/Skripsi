'use client';

import Navbar from "@/components/Navbar/navbar";
import ProfileTabs from "@/components/ProfileTabs/Profiletabs";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import './page.css';
import Navbartabs from "@/components/Navbartabs/navbartabs";

type Tender = {
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
  tipeTender: string;
};

const dummyTenders: Tender[] = [
  {
    _id: "1",
    kodeTender: "TND001",
    namaTender: "Pembangunan Jalan Tol",
    instansi: "Kementerian PUPR",
    satuanKerja: "Dirjen Bina Marga",
    kategori: "Konstruksi",
    nilaiPagu: 10000000000,
    nilaiHps: 9500000000,
    metodePemilihan: "Lelang Umum",
    tahapan: "Evaluasi Dokumen",
    tahunAnggaran: 2025,
    tanggalPengumuman: "2025-01-10",
    status: "Dalam Proses",
    peserta: [],
    pemenang: {
      nama: "PT. Konstruksi Hebat",
      npwp: "01.234.567.8-999.000",
      hargaMenang: 9000000000,
      tanggalMenang: "2025-06-01"
    },
    tipeTender: "tender"
  },
  {
    _id: "2",
    kodeTender: "TND002",
    namaTender: "Pengadaan Alat Kesehatan",
    instansi: "Kementerian Kesehatan",
    satuanKerja: "Ditjen Yankes",
    kategori: "Barang",
    nilaiPagu: 5000000000,
    nilaiHps: 4800000000,
    metodePemilihan: "Tender Cepat",
    tahapan: "Pengumuman",
    tahunAnggaran: 2025,
    tanggalPengumuman: "2025-03-20",
    status: "Pengumuman",
    peserta: [],
    pemenang: {
      nama: "PT. Medis Sejahtera",
      npwp: "02.345.678.9-000.123",
      hargaMenang: 4700000000,
      tanggalMenang: "2025-06-15"
    },
    tipeTender: "nontender"
  },
  {
    _id: "2",
    kodeTender: "TND003",
    namaTender: "Pengadaan Alat Konstruksi",
    instansi: "Kementerian PUPR",
    satuanKerja: "Ditjen Yankes",
    kategori: "Alat",
    nilaiPagu: 5000000000,
    nilaiHps: 4800000000,
    metodePemilihan: "Tender Cepat",
    tahapan: "Pengumuman",
    tahunAnggaran: 2025,
    tanggalPengumuman: "2025-03-20",
    status: "Pengumuman",
    peserta: [],
    pemenang: {
      nama: "PT. Medis Sejahtera",
      npwp: "02.345.678.9-000.123",
      hargaMenang: 4700000000,
      tanggalMenang: "2025-06-15"
    },
    tipeTender: "pct_nontender"
  }
];

const tabLabels = {
  tender: 'Tender',
  nontender: 'Non-Tender',
  pct_nontender: 'Pencatatan Non-Tender',
  swakelola: 'Pencatatan Swakelola',
  pct_darurat: 'Pencatatan Darurat',
};

type ListKey = keyof typeof tabLabels;

export default function TenderSayaPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [activeTab, setActiveTab] = useState<ListKey>('tender');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get('page') || '1');
    const limitFromParams = parseInt(searchParams.get('limit') || '25');
    setCurrentPage(pageFromParams);
    setItemsPerPage(limitFromParams);
  }, [searchParams]);

  useEffect(() => {
    setTenders(dummyTenders);
  }, []);

  const filteredTenders = tenders.filter(t => t.tipeTender === activeTab);
  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTenders = filteredTenders.slice(indexOfFirstItem, indexOfLastItem);

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
    <div>
      <Navbar />

      <Navbartabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as ListKey)}
        tabs={tabLabels}
      />

      <div className="list-container">
        <h1 className="list-title">List Tender Yang Sedang Di Ikuti</h1>
        <div className="table-wrapper">
          <table className="tender-table">
            <thead>
              <tr>
                <th className='kode-paket'>Kode</th>
                <th>Nama Tender</th>
                <th>Instansi</th>
                <th>Tahapan</th>
                <th>Nilai Pagu</th>
                <th>HPS</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={`page-${currentPage}-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentTenders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty-message">
                      Belum ada tender yang kamu ikuti di kategori <strong>{tabLabels[activeTab]}</strong>.
                      <br />
                      <span style={{ fontSize: '14px', color: '#777' }}>
                        Silakan eksplor kategori lain atau ikuti tender terlebih dahulu.
                      </span>
                    </td>
                  </tr>
                ) : (
                  currentTenders.map((tender) => (
                    <tr key={tender._id} className="tender-row">
                      <td>{tender.kodeTender}</td>
                      <td>
                        <Link href={`/tender/${tender._id}`} className="tender-link">
                          {tender.namaTender}
                        </Link>
                        <br />
                        <p className="detailpaket">
                          Jasa Konsultansi Badan Usaha Konstruksi - TA {tender.tahunAnggaran} - Metode: {tender.metodePemilihan}
                        </p>
                      </td>
                      <td>{tender.instansi}</td>
                      <td>
                        <Link href={`/tahapan/${encodeURIComponent(tender.tahapan)}`} className="tender-link">
                          {tender.tahapan}
                        </Link>
                      </td>
                      <td className="Harga">Rp {tender.nilaiPagu.toLocaleString('id-ID')}</td>
                      <td className="Harga">Rp {tender.nilaiHps.toLocaleString('id-ID')}</td>
                    </tr>
                  ))
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        <div className="pagination-container">
          <label className='labelbawah' htmlFor="limitSelect">Tampilkan: </label>
          <select className='limitSelect' value={itemsPerPage} onChange={handleLimitChange}>
            <option value={25}>25</option>
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
    </div>
  );
}
