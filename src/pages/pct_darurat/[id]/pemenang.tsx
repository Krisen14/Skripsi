// pages/tender/[id]/index.tsx
import TenderDetailLayout from '@/components/DetailLayout/DetailLayout';
import Navbar from '@/components/Navbar/navbar';
import TenderTabs from '@/components/Tendertabs/TenderTabs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
    fetch(`/api/pct_darurat/${id}`)
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
        <h1 className="text-xl font-bold">Pemenang</h1>
        <p><strong>Jenis Pengadaan:</strong> {tender.kategori}</p>
        <p><strong>Instansi:</strong> {tender.instansi}</p>
        <p><strong>Nama:</strong> {tender.pemenang?.nama || 'Belum ada pemenang'}</p>
        <p><strong>NPWP:</strong> {tender.pemenang?.npwp || '-'}</p>
        <p><strong>Harga Menang:</strong> Rp {tender.pemenang?.hargaMenang?.toLocaleString('id-ID') || '-'}</p>
        <p><strong>Tanggal Menang:</strong> {tender.pemenang?.tanggalMenang || '-'}</p>

       
      </div>
      </TenderDetailLayout>
  );
}
