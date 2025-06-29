// pages/tender/[id]/index.tsx
'use client';
import Navbar from '@/components/Navbar/navbar';
import TenderTabs from '@/components/Tendertabs/TenderTabs';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, Fragment } from 'react';
import './peserta.css';
import TenderDetailLayout from '@/components/DetailLayout/DetailLayout';
import GlosariumModal from '@/components/Glosarium/page';

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

  const [showGlosarium, setShowGlosarium] = useState(false);

  function closeGlosarium() {
    setShowGlosarium(false);
  }
  
  function openGlosarium() {
    setShowGlosarium(true);
  }


  const router = useRouter();
  const { id } = router.query;
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    if (!router.isReady || !id) return;

    setLoading(true);
    fetch(`/api/pct_nontender/${id}`)
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
      <div className="peserta-header">
  <h2 style={{textAlign:'center', }}>Daftar Peserta</h2>
  <button className="glosarium-button" onClick={openGlosarium}>
    Glosarium
  </button>
  <GlosariumModal isOpen={showGlosarium} onClose={closeGlosarium} />
</div>
        <div className="peserta-table-container">
          <table className="peserta-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NPWP</th>
                <th className="tooltip-wrapper">
  <span>
    Penawaran
    <svg xmlns="http://www.w3.org/2000/svg" 
    width={20} 
    height={20} 
    viewBox="0 0 24 24">
      <g fill="none"><circle cx={12} cy={12} r={10} stroke="#000" strokeWidth={1.5}></circle>
      <path stroke="#000" strokeLinecap="round" strokeWidth={1.5} d="M12 17v-6"></path>
      <circle cx={1} cy={1} r={1} fill="#000" transform="matrix(1 0 0 -1 11 9)"></circle></g></svg>
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
                        <td>Rp {peserta.penawaran.toLocaleString('id-ID')}</td>
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
                              <strong>Hasil Evaluasi:</strong><br />
                              <div className="evaluasi-badge-container">
                              <span className={`badge ${peserta.administrasi ? 'success' : 'fail'}`}>
    {peserta.administrasi ? 'Evaluasi Kualifikasi' : 'Evaluasi Kualifikasi ✖️'}
  </span>
  <span className={`badge ${peserta.teknis ? 'success' : 'fail'}`}>
    Pembuktian Kualifikasi
  </span>
  <span className={`badge ${peserta.harga ? 'success' : 'fail'}`}>
    Evaluasi Harga
  </span>
  </div>


  <div className='rincian-skor'>
                
  </div>
                              
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
