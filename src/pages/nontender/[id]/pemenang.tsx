// pages/tender/[id]/index.tsx
'use client';

import TenderDetailLayout from '@/components/DetailLayout/DetailLayout';
import Navbar from '@/components/Navbar/navbar';
import TenderTabs from '@/components/Tendertabs/TenderTabs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import './pemenang.css';

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
  }[];
  pemenang: {
    nama: string;
    npwp: string;
    hargaMenang: number;
    tanggalMenang: string;
  };
};

export default function Pemenang() {
  const router = useRouter();
  const { id } = router.query;
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);

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
        <h1 className="text-xl font-bold">Pemenang</h1>
      <div className="pemenang-grid section">
        <p><strong>Nama Tender:</strong> {tender.namaTender}</p>
        <p><strong>Jenis Pengadaan:</strong> {tender.kategori}</p>
        <p><strong>Instansi:</strong> {tender.instansi}</p>
        <p><strong>Satuan Kerja:</strong>{tender.satuanKerja}</p>
        <p><strong>Harga Pagu:</strong>{tender.nilaiPagu}</p>
        <p><strong>HPS:</strong>{tender.nilaiHps}</p>
        </div>

        <div className="winner-card">
      <h3 className="winner-title">Pemenang Tender</h3>

      {tender.pemenang ? (
        <div className="winner-content">
          <p><span className="label">Nama:</span> {tender.pemenang.nama}</p>
          <p><span className="label">NPWP:</span> {maskNpwp(tender.pemenang.npwp)}</p>
          <p><span className="label">Harga Menang:</span> Rp {tender.pemenang.hargaMenang.toLocaleString('id-ID')}</p>
          <p>
            <span className="label">Tanggal Menang:</span>{' '}
            {new Date(tender.pemenang.tanggalMenang).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            <p><span className='label'>Alamat:</span></p>
          </p>
        </div>
      ) : (
        <p className="no-winner">Belum ada pemenang</p>
      )}
    </div>
        </TenderDetailLayout>
      
  );
}
