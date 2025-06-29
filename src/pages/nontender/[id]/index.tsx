// pages/tender/[id]/index.tsx
'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TenderDetailLayout from '@/components/DetailLayout/DetailLayout';
import './index.css';
import TenderPopup from '@/components/TenderPopUp/page';

const PDF = 'https://lpse.jakarta.go.id/eproc4/dl/234644006700160e0c63c666082713a316897c97720701d13cc1ba3d61da643425dd55944921daf106b4fd1d1ac0742fb3e651f341d75dec5c8a959cbf5f8b79acb783e3cbaf53a9603ffc04044cc8e73f3801940867718db89c8f4856965684ec388d8e31cde1742249211759e585aa';

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

export default function TenderDetailPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    if (!router.isReady || !id) return;
    setLoading(true);
    fetch(`/api/nontender/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Not Found'))
      .then((data: Tender) => setTender(data))
      .catch(() => setTender(null))
      .finally(() => setLoading(false));
  }, [router.isReady, id]);

  if (loading) {
    return (
      <TenderDetailLayout>
        <div className="loading">Loading...</div>
      </TenderDetailLayout>
    );
  }

  if (!tender) {
    return (
      <TenderDetailLayout>
        <div className="not-found">Tender Tidak Ditemukan.</div>
      </TenderDetailLayout>
    );
  }

 return (
  <TenderDetailLayout>
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >

      <motion.div
        className="tender-grid section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="tender-container">
      <div className="tender-row">
        <div className="label-box">Nama Tender</div>
        <div className="value-box">{tender.namaTender}</div>
        <div className="label-boxPAGU">Nilai Pagu</div>
        <div className="value-box">Rp {tender.nilaiPagu.toLocaleString('id-ID')}</div>
      </div>

      <div className="tender-row">
        <div className="label-box">Lokasi Pekerjaan</div>
        <div className="value-boxalamat">Jl. Medan Merdeka Selatan No. 8-9 Blok H Lt. 17 - Jakarta Pusat (Kota)</div>
        <div className="label-boxHPS">Nilai HPS</div>
        <div className="value-box">Rp {tender.nilaiHps.toLocaleString('id-ID')}</div>
      </div>

      <div className='tender-container2'>

      <div className="tender-row">
        <div className="label-box">Kode Tender</div>
        <div className="value-box">{tender.kodeTender}</div>
        <div className="label-box">Kode RUP</div>
        <div className="value-box">55464191</div>
      </div>

      <div className="tender-row">
        <div className="label-box">Tanggal Pengumuman</div>
        <div className="value-box">{new Date(tender.pemenang.tanggalMenang).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}</div>
        <div className="label-box">Instansi</div>
        <div className="value-box">{tender.instansi}</div>
      </div>
      </div>

      <div className="tender-row">
        <div className="label-box">Satuan Kerja</div>
        <div className="value-box">{tender.satuanKerja}</div>
      </div>

      <div className="tender-row">
        <div className="label-box">Tahun Anggaran</div>
        <div className="value-box">{tender.tahunAnggaran}</div>
        <div className="label-box">Sumber Dana</div>
        <div className="value-box">APBD</div>
      </div>

      <div className="tender-row">
        <div className="label-box">Jenis Kontrak</div>
        <div className="value-box">Lumsum</div>
        <div className="label-box">Kategori</div>
        <div className="value-box">Jasa Konsultansi Badan Usaha Non Konstruksi</div>
      </div>
    </div>
      </motion.div>

      <motion.div
      className="tender-grid2 section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}>

      <p><strong>Uraian Singkat Pekerjaan:</strong> <a href={PDF} target="_blank" rel="noopener noreferrer">Uraian Singkat Pekerjaan</a> </p>
      <p><strong>Peserta:</strong> 27peserta</p>
      
      </motion.div>

      <div className="section">
        <h2>Syarat Kualifikasi:</h2>

        <motion.div
          className="box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3>Administrasi / Legalitas</h3>
<p><strong className='strong1'>Memenuhi ketentuan peraturan perundang-undangan untuk menjalankan kegiatan/usaha.</strong></p>
<table className='tablep1'>
  <tbody>
    <tr>
      <th align="center">NIB:</th>
      <td>Memiliki Nomor Induk Berusaha dan Sertifikat Standar.</td>
    </tr>
    <tr>
      <th align="center">SBU:</th>
      <td>Memiliki Sertifikat Badan Usaha SBU dengan Kualifikasi Usaha Kecil serta disyaratkan Klasifikasi Pengawasan Rekayasa dengan subklasifikasi Jasa Pengawasan Pekerjaan Konstruksi Bangunan Gedung RE201 sesuai atau subklasifikasi Jasa Rekayasa Konstruksi Bangunan Gedung Hunian dan Non Hunian RK001.</td>
    </tr>
  </tbody>
</table>



<ul className='ul1'>
<li>Status valid wajib pajak.</li>
<li>Bukti hukum seperti Akta Pendirian, Surat Kuasa, dan KTP.</li>
<li>Pernyataan Pakta Integritas dan Peserta sesuai ketentuan.</li>
<li>Jika konsorsium, wajib perjanjian dan ketentuan jumlah anggota dipenuhi.</li>
</ul>

<p><strong className='strong1'>Secara hukum mempunyai kapasitas untuk mengikatkan diri pada Kontrak yang dibuktikan dengan:</strong></p>
<table className='tablep2'>
  <thead>
    <tr>
      <th>No</th>
      <th>Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Akta Pendirian Perusahaan dan/atau perubahannya</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Surat Kuasa (apabila dikuasakan)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Bukti bahwa yang diberikan kuasa merupakan pegawai tetap (apabila dikuasakan)</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Kartu Tanda Penduduk</td>
    </tr>
  </tbody>
</table>
<ul className='ul1'>
<li>Menyetujui Pernyataan Pakta Integritas.</li>
<li>Menyetujui Surat Pernyataan Peserta.</li>
<li>Jika ada kerja sama operasi/konsorsium/kemitraan, maka wajib memiliki perjanjian resmi.</li>
</ul>

<div className='sectiontablep3'>
<p><strong className='strong1'>Kerja sama operasi dapat dilaksanakan dengan ketentuan:</strong></p>
<table className='tablep3'>
  <thead>
    <tr>
      <th>No</th>
      <th>Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td> Memiliki Kualifikasi Usaha Non Kecil dengan Kualifikasi Usaha Non Kecil</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Memiliki Kualifikasi Usaha Non Kecil dengan Kualifikasi Usaha Kecill</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Memiliki Kualifikasi Usaha Non Kecil dengan Koperasi</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Memiliki Kualifikasi Usaha Kecil dengan Kualifikasi Usaha Kecil</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Memiliki Kualifikasi Usaha Kecil dengan Koperasi</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Memiliki Kualifikasi Usaha Kecil Koperasi Dengan Koperasi</td>
    </tr>
  </tbody>
</table>
</div>

<p>Leadfirm kerja sama operasi harus memiliki kualifikasi setingkat atau lebih tinggi dari anggota lainnya.</p>

<p><strong className='strong1'>Kerja sama operasi dibatasi jumlah anggotanya sebagai berikut:</strong></p>

<table className='tablep3'>
  <thead>
    <tr>
      <th>No</th>
      <th>Kategori Pekerjaan</th>
      <th>Maksimal Anggota</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Bersifat tidak kompleks</td>
      <td>3 perusahaan</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Bersifat kompleks</td>
      <td>5 perusahaan</td>
    </tr>
  </tbody>
</table>

<h4>Persyaratan Kualifikasi Lain</h4>
<p>Menyampaikan Surat Pernyataan bermaterai Rp.10.000,00 tidak akan menuntut jika anggaran tidak tersedia atau tidak cukup tersedia.</p>

<table className='tablep3'>
  <thead>
    <tr>
      <th>No</th>
      <th>Deskripsi Persyaratan</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Pengalaman 1 pekerjaan sejenis dalam 4 tahun terakhir</td>

    </tr>
    <tr>
      <td>2</td>
      <td>Pengalaman sesuai klasifikasi atau lingkup pekerjaan</td>

    </tr>
    <tr>
      <td>3</td>
      <td>(1) untuk pekerjaan Usaha Kecil berdasarkan subklasifikasi; atau</td>

    </tr>
    <tr>
      <td>4</td>
      <td>(2) untuk pekerjaan Usaha Menengah atau Usaha Besar, pekerjaan sejenis berdasarkan subklasifikasi atau berdasarkan lingkup pekerjaan.</td>

    </tr>
    <tr>
      <td>5</td>
      <td>memiliki pengalaman mengerjakan pekerjaan sejenis dalam waktu 10 (sepuluh) tahun terakhir.</td>

    </tr>
    <tr>
      <td>6</td>
      <td>Penyedia dengan kualifikasi usaha kecil yang baru berdiri kurang dari 3 (tiga) tahun dan belum memiliki pengalaman dikecualikan dari ketentuan butir 1) huruf a) sampai dengan huruf c) untuk nilai paket pengadaan sampai dengan paling banyak Rp. 1.000.000.000,00 (satu miliar rupiah).</td>

    </tr>
    <tr>
      <td>7</td>
      <td>Syarat Kualifikasi Teknis Lain</td>

    </tr>
    <tr>
      <td>8</td>
      <td>Persyaratan Kualifikasi Teknis lainnya dalam KAK</td>

    </tr>
  </tbody>
</table>
        </motion.div>

        {isLoggedIn && (
        <button
          onClick={() => setShowPopup(true)}
          className="ikuti-button"
        >
          Ikuti Tender
        </button>
      )}

      {showPopup && (
        <TenderPopup
          tenderName={tender.namaTender}
          onClose={() => setShowPopup(false)}
        />
      )}
      </div>
      </motion.div>
    </TenderDetailLayout>
  );
}