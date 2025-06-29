// pages/tender/[id]/index.tsx
'use client';
import Navbar from '@/components/Navbar/navbar';
import TenderTabs from '@/components/Tendertabs/TenderTabs';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, Fragment } from 'react';
import './peserta.css';
import TenderDetailLayout from '@/components/DetailLayout/DetailLayout';

type Tender = {
  _id: string | { $oid: string };
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
    alasan: string;
    administrasi: boolean;
    teknis?: boolean;
    harga: boolean;
    skorTeknis?: boolean,
    skorTotal?: number;
  }[];
  pemenang: {
    nama: string;
    npwp: string;
    hargaMenang: number;
    tanggalMenang: string;
  };
};

export default function Peserta() {
  const router = useRouter();
  const { id } = router.query;
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    if (!router.isReady || !id) return;

    setLoading(true);
    fetch(`/api/nontender/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data: Tender) => {
        setTender(data);
      })
      .catch(() => {
        setTender(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.isReady, id]);

  function maskNpwp(npwp: string): string {
    const clean = npwp.replace(/[.\-]/g, '');
    return `${clean.slice(0, 4)}-${'*'.repeat(4)}-${'*'.repeat(4)}`;
  }

  function toggleRow(index: number) {
    setExpandedRow(prev => (prev === index ? null : index));
  }

  if (loading) {
    return (
      <TenderDetailLayout>
        <div className="p-6">Loading...</div>
      </TenderDetailLayout>
    );
  }

  if (!tender) {
    return (
      <TenderDetailLayout>
        <div className="p-6">Tender Tidak Ditemukan.</div>
      </TenderDetailLayout>
    );
  }

  return (
    <TenderDetailLayout>
      <div className="p-6">
        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem' }}>Daftar Peserta</h2>
        <div className="peserta-table-container">
          <table className="peserta-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NPWP</th>
                <th className="tooltip-wrapper">
  <span>
    Penawaran{' '}
    <img
      src="/icons/info-circle.svg" 
      alt="Info"
      className="info-icon"
    />
  </span>
  <span className="tooltip-text">
    Penawaran Sudah Terkoreksi
  </span>
</th>
                <th>Hasil Negosiasi</th>
                <th>Skor Harga</th>
                <th>Skor Akhir</th>
                <th>Status</th>

              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {tender.peserta?.map((peserta, index) => {
                  const isExpanded = expandedRow === index;
                  

                  return (
                    <Fragment key={index}>
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td>{index + 1}</td>
                        <td
                          onClick={() => toggleRow(index)}
                          style={{ cursor: 'pointer', color: '#0070f3' }}
                        >
                          {isExpanded ? '◣' : '▶'} {peserta.nama}
                        </td>
                        <td>{maskNpwp(peserta.npwp)}</td>
                        <td>Rp {peserta.penawaran}</td>
                        <td></td>
                        <td></td>
                        <td>{peserta.skorTotal ?? '-'}</td>
                        <td>{peserta.terkualifikasi ? '✔️' : '❌'}</td>
                        
                      </motion.tr>

                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan={6} className="expanded-row">
                            <div>
                              <strong>Evaluasi:</strong><br />
                              Evaluasi Administrasi: {peserta.administrasi ? '✅' : '❌'} |{''}
                              Evaluasi Teknis: {peserta.teknis ? '✅' : '❌'} |{' '}
                              Evaluasi Harga: {peserta.teknis ? '✅' : '❌' }
                              Evaluasi Kualifikasi: {peserta.harga ? '✅' : '❌' }<br />
                              
                              <strong>Alasan:</strong> {peserta.alasan || ''}
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    </TenderDetailLayout>
  );
}
