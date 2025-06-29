'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import './ListTenderBeranda.css';
import Modal from '../Modal/Modal';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Tender = {
  _id: string;
  namaTender: string;
  kategori: string;
  nilaiHps: number;
  status: string;
  akhirPendaftaran: string;
  tanggalPengumuman: string;
  tahunAnggaran: string;
};

export default function TenderGrouped() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Tender[]>>({});
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);

  const sliderRefs = useRef<(Slider | null)[]>([]); // Untuk menambahkan ref ke setiap slider container

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const res = await fetch('/api/users'); // Ganti jika endpoint-nya beda
        const data = await res.json();
        setTenders(data);
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };

    fetchTenders();
  }, []);

  useEffect(() => {
    const groupByCategory = () => {
      const result: Record<string, Tender[]> = {};
      const filtered = tenders.filter(t => t.status === 'Sedang Berjalan');
      for (const tender of filtered) {
        if (!result[tender.kategori]) {
          result[tender.kategori] = [];
        }
        result[tender.kategori].push(tender);
      }
      setGrouped(result);
    };

    if (tenders.length > 0) groupByCategory();
  }, [tenders]);

  // Setting untuk react-slick slider
  const sliderSettings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Menangani klik dan drag untuk scroll horizontal dengan mouse kanan
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (e.button === 2) { // Tombol kanan mouse
      const container = sliderRefs.current[index];
      if (container) {
        container.slickGoTo(0); // Menandakan mulai dari posisi pertama (bisa disesuaikan)
      }
    }
  };

  return (
    <div className="list-container">
      <div className="header-tender-beranda">
        <h2>Tender <Link href="/caripaket">Lihat Semua »</Link></h2>
      </div>

      {Object.entries(grouped).map(([kategori, list], index) => (
        <div key={index} className="tender-group" onMouseDown={(e) => handleMouseDown(e, index)}>
          <h3 className="kategori-title">{kategori}</h3>
          <Slider ref={(el) => (sliderRefs.current[index] = el)} {...sliderSettings}>
            {list.slice(0, 10).map((tender) => (
             <div className="tender-card" key={tender._id}>
             <div className="card-header">
               <h4 className="nama-tender">{tender.namaTender}</h4>
               <p className="kategori-text">{tender.kategori}</p>
             </div>
             <div className="card-body-grid">
  <div><strong>TA:</strong> {tender.tahunAnggaran}</div>
  <div><strong>Kode:</strong> {tender._id}</div>
  <div><strong>Tgl Umum:</strong> {new Date(tender.tanggalPengumuman).toLocaleDateString('id-ID')}</div>
  <div><strong>Akhir Daftar:</strong> {new Date(tender.akhirPendaftaran).toLocaleDateString('id-ID')}</div>
  <div className="nilai-hps"><strong>HPS:</strong> Rp {tender.nilaiHps.toLocaleString('id-ID')}</div>
  <div className={`status ${tender.status === 'Sedang Berjalan' ? 'status-berjalan' : 'status-lain'}`}>
    <strong>Status:</strong> {tender.status}</div>
    </div>
             <div className="card-footer">
               <button
                 className="tender-link-btn"
                 onClick={() => setSelectedTender(tender)}
               >
                 Detail
               </button>
             </div>
           </div>
            ))}
          </Slider>
        </div>
      ))}

      <Modal isOpen={!!selectedTender} onClose={() => setSelectedTender(null)}>
        <h3>{selectedTender?.namaTender}</h3>
        <div className='modal'>
        <div className='grid-modal'>
          <p><strong>Kategori:</strong> {selectedTender?.kategori}</p>
          <p><strong>HPS:</strong> Rp {selectedTender?.nilaiHps.toLocaleString('id-ID')}</p>
          <p><strong>Status:</strong> {selectedTender?.status}</p>
          <p><strong>Tanggal Pengumuman:</strong> {new Date(selectedTender?.tanggalPengumuman!).toLocaleDateString('id-ID')}</p>
          <p><strong>Akhir Pendaftaran:</strong> {new Date(selectedTender?.akhirPendaftaran!).toLocaleDateString('id-ID')}</p>
          <p><strong>Status:</strong> {selectedTender?.status}</p>
        </div>
        <div className="modal-actions">
          <Link href={`/tender/${selectedTender?._id}`} className="btn-detail">Detail Selengkapnya</Link>
          <button onClick={() => setSelectedTender(null)} className="btn-close">Tutup</button>
        </div>
        </div>
      </Modal>
    </div>
  );
}
