'use client';

import Navbar from "@/components/Navbar/navbar";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './page.css';
import ProfileTabs from "@/components/ProfileTabs/Profiletabs";

const documentData = [
    {
        no: "1",
        name: "Template Surat Permohonan dan Dokumen Pendukung Non Penyedia (PD atau UKPD Provinsi DKI Jakarta)",
        date: "6 Februari 2025 10:26",
        desc: "Template Surat Permohonan dan Dokumen Pendukung bagi Non Penyedia (PD atau UKPD Provinsi DKI Jakarta)",
        url: "https://lpse.jakarta.go.id/eproc4/dl/b09480ae4476fdf181f5b1f42bf249dd3f09bc7c1514623f6ad30f877d370bad18774e5996027b03e8de40fba23bccc0cd877488e1fd84faa701763eea7a14b706806ed8e25ec7dcf49e8d305421d0b57ea024fd7e28d472c5666dd6509916085a8c9d76bb491ee341421c4b469aa121",
      },
      {
        no:"2",
        name: "Pengumuman Rencana Umum Pengadaan dan Pelaksanaan Pengadaan Barang/Jasa Tahun Anggaran 2025",
        date: "6 September 2024 16:12",
        desc: "Instruksi Sekretaris Daerah Provinsi Daerah Khusus Ibukota Jakarta No. 62 Tahun 2024 tentang Pengumuman RUP dan Percepatan Pelaksanaan Pengadaan Barang/Jasa Tahun Anggaran 2025",
        url:"https://lpse.jakarta.go.id/eproc4/dl/3aee80ca18808893bf4b2493384bda49292c46e46a06a44c80cd05de57a0f824a6fed1087230edac1f4ee6af97d46bf5d33fbc9bd4d3f4466185e5897ec71def81ccaa421a6f971b3e55950463395cd249d7042d8d05d30aed0f26b8777f887e",
      },
      {   
        no:"3",
        name: "Kebijakan Sistem Manajemen Keamanan Informasi LPSE Provinsi DKI Jakarta",
        date: "2 Januari 2025 09:36",
        desc: "Kebijakan Sistem Manajemen Keamanan Informasi LPSE Provinsi DKI Jakarta",
        url:"https://lpse.jakarta.go.id/eproc4/dl/8be8de0bff09df143fef9efd3f8fa5da5fd6294b100a4b255c494f14c8bb90f31b926a81e77aed340f02a72ed2c88a2d1ab53581ec120ef07c091d6e910d7ba6627f43956e8cd979fa2af11ccba97ac896833bcebd7f19f983b831bae6d82b05",
      },
      {
        no:"4",
        name: "Petunjuk Teknis Pendaftaran Penyedia di E-Katalog",
        date: "2 Januari 2025 09:40",
        desc: "Petunjuk Teknis Pendaftaran Penyedia di E-Katalog",
        url:"https://lpse.jakarta.go.id/eproc4/dl/809c03e0eadefd7f28384a570f43419a267804190050824c919eb3e05b479869a93a91c057cf32b519cc2d9b4bf7c6f77cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"5",
        name: "Template Surat Permohonan Perubahan Data Penyedia",
        date: "2 Januari 2025 09:40",
        desc: "Template Surat Permohonan Perubahan Data bagi Penyedia",
        url:"https://lpse.jakarta.go.id/eproc4/dl/809c03e0eadefd7f28384a570f43419a267804190050824c919eb3e05b479869a93a91c057cf32b519cc2d9b4bf7c6f77cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"6",
        name: "Petunjuk Teknis Pendaftaran dan Verifikasi Data Penyedia SPSE Via Offline",
        date: "2 Januari 2025 09:32",
        desc: "Petunjuk Teknis Pendaftaran dan Verifikasi Data Penyedia SPSE Via Offline",
        url:"https://lpse.jakarta.go.id/eproc4/dl/3418db8e9c4db862b861eec6e40ae3267b77ad550da474fe13a932b3d5867228482bd0a17d8a410a22c78e441a5406251ab53581ec120ef07c091d6e910d7ba6627f43956e8cd979fa2af11ccba97ac896833bcebd7f19f983b831bae6d82b05",
      },
      {
        no:"7",
        name: "Petunjuk Teknis Pendaftaran dan Verifikasi Data Penyedia SPSE Usaha Perseorangan Via Offline",
        date: "2 Januari 2025 09:32",
        desc: "Petunjuk Teknis Pendaftaran dan Verifikasi Data Penyedia SPSE Usaha Peseorangan Via Offline",
        url:"https://lpse.jakarta.go.id/eproc4/dl/7960b5dd3d2efc97cebbbbff22a1a227d7a458a19e8986537e442de17041b4c8d22f39bdee0b4219482ec111224652397cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"8",
        name: "Template Surat Permohonan Verifikasi Pendaftaran Penyedia",
        date: "2 Januari 2025 09:32",
        desc: "Template Surat Permohonan Verifikasi Pendaftaran bagi Penyedia Barang/Jasa Baru di Layanan Pengadaan Secara Elektronik Badan Pelayanan Pengadaan Barang/Jasa Provinsi DKI Jakarta",
        url:"https://lpse.jakarta.go.id/eproc4/dl/476b8cc3ad9a221b61891ffccc24dd611c000a279c55f599e2dbb91b7f1f32d3a3bbacb058048db279f8539da522f72c7cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"9",
        name: "Petunjuk Teknis Perubahan dan Verifikasi Data Penyedia SPSE",
        date: "2 Januari 2025 09:33",
        desc: "Petunjuk Teknis Perubahan dan Verifikasi Data Penyedia SPSE",
        url:"https://lpse.jakarta.go.id/eproc4/dl/1a2d936168f68e3725ea0ae8691ce8ce7aab350e3e31fc4345829007e17d09342193c30d12531f9522ce88e09e10007a1ab53581ec120ef07c091d6e910d7ba6627f43956e8cd979fa2af11ccba97ac896833bcebd7f19f983b831bae6d82b05",
      },
      {
        no:"10",
        name: "Petunjuk Teknis Permohonan User ID dan Password atau Perubahan Data Non Penyedia",
        date: "6 Februari 2025 10:27",
        desc: "Petunjuk Teknis Permohonan User ID dan Password atau Perubahan Data bagi Non Penyedia (PA/ KPA, PPK, Pokja Pemilihan, Pejabat Pengadaan (PP) dan Auditor",
        url:"https://lpse.jakarta.go.id/eproc4/dl/81a7e7133c6fda9cf72cbbec503c8f4ac2454de941ec102b9feebec8bd2f64f18c6f0e6db6a351933d0600698e1ef6cacd877488e1fd84faa701763eea7a14b706806ed8e25ec7dcf49e8d305421d0b57ea024fd7e28d472c5666dd6509916085a8c9d76bb491ee341421c4b469aa121",
      },
      {
        no: "1",
        name: "Template Surat Permohonan dan Dokumen Pendukung Non Penyedia (PD atau UKPD Provinsi DKI Jakarta)",
        date: "6 Februari 2025 10:26",
        desc: "",
        url: "https://lpse.jakarta.go.id/eproc4/dl/b09480ae4476fdf181f5b1f42bf249dd3f09bc7c1514623f6ad30f877d370bad18774e5996027b03e8de40fba23bccc0cd877488e1fd84faa701763eea7a14b706806ed8e25ec7dcf49e8d305421d0b57ea024fd7e28d472c5666dd6509916085a8c9d76bb491ee341421c4b469aa121",
      },
      {
        no:"2",
        name: "Pengumuman Rencana Umum Pengadaan dan Pelaksanaan Pengadaan Barang/Jasa Tahun Anggaran 2025",
        date: "6 September 2024 16:12",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/3aee80ca18808893bf4b2493384bda49292c46e46a06a44c80cd05de57a0f824a6fed1087230edac1f4ee6af97d46bf5d33fbc9bd4d3f4466185e5897ec71def81ccaa421a6f971b3e55950463395cd249d7042d8d05d30aed0f26b8777f887e",
      },
      {   
        no:"3",
        name: "Kebijakan Sistem Manajemen Keamanan Informasi LPSE Provinsi DKI Jakarta",
        date: "2 Januari 2025 09:36",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/8be8de0bff09df143fef9efd3f8fa5da5fd6294b100a4b255c494f14c8bb90f31b926a81e77aed340f02a72ed2c88a2d1ab53581ec120ef07c091d6e910d7ba6627f43956e8cd979fa2af11ccba97ac896833bcebd7f19f983b831bae6d82b05",
      },
      {
        no:"4",
        name: "Petunjuk Teknis Pendaftaran Penyedia di E-Katalog",
        date: "2 Januari 2025 09:40",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/809c03e0eadefd7f28384a570f43419a267804190050824c919eb3e05b479869a93a91c057cf32b519cc2d9b4bf7c6f77cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"5",
        name: "Template Surat Permohonan Perubahan Data Penyedia",
        date: "2 Januari 2025 09:40",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/809c03e0eadefd7f28384a570f43419a267804190050824c919eb3e05b479869a93a91c057cf32b519cc2d9b4bf7c6f77cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"6",
        name: "Petunjuk Teknis Pendaftaran dan Verifikasi Data Penyedia SPSE Via Offline",
        date: "2 Januari 2025 09:32",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/3418db8e9c4db862b861eec6e40ae3267b77ad550da474fe13a932b3d5867228482bd0a17d8a410a22c78e441a5406251ab53581ec120ef07c091d6e910d7ba6627f43956e8cd979fa2af11ccba97ac896833bcebd7f19f983b831bae6d82b05",
      },
      {
        no:"7",
        name: "Petunjuk Teknis Pendaftaran dan Verifikasi Data Penyedia SPSE Usaha Perseorangan Via Offline",
        date: "2 Januari 2025 09:32",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/7960b5dd3d2efc97cebbbbff22a1a227d7a458a19e8986537e442de17041b4c8d22f39bdee0b4219482ec111224652397cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"8",
        name: "Template Surat Permohonan Verifikasi Pendaftaran Penyedia",
        date: "2 Januari 2025 09:32",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/476b8cc3ad9a221b61891ffccc24dd611c000a279c55f599e2dbb91b7f1f32d3a3bbacb058048db279f8539da522f72c7cf3778c5a84d0eef92b55891b13a1f335f0de9cfc0af8b6f510ced0867c7cb7cb9a33dbd0218fcd611d7ca8cdb2b8c5",
      },
      {
        no:"9",
        name: "Petunjuk Teknis Perubahan dan Verifikasi Data Penyedia SPSE",
        date: "2 Januari 2025 09:33",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/1a2d936168f68e3725ea0ae8691ce8ce7aab350e3e31fc4345829007e17d09342193c30d12531f9522ce88e09e10007a1ab53581ec120ef07c091d6e910d7ba6627f43956e8cd979fa2af11ccba97ac896833bcebd7f19f983b831bae6d82b05",
      },
      {
        no:"10",
        name: "Petunjuk Teknis Permohonan User ID dan Password atau Perubahan Data Non Penyedia",
        date: "6 Februari 2025 10:27",
        desc: "",
        url:"https://lpse.jakarta.go.id/eproc4/dl/81a7e7133c6fda9cf72cbbec503c8f4ac2454de941ec102b9feebec8bd2f64f18c6f0e6db6a351933d0600698e1ef6cacd877488e1fd84faa701763eea7a14b706806ed8e25ec7dcf49e8d305421d0b57ea024fd7e28d472c5666dd6509916085a8c9d76bb491ee341421c4b469aa121",
      },
    ];

export default function LogAkses() {

    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(documentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documentData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };


  return (
    <div className="body">
      <Navbar />

      <div className="list-container">
      <div className="section-header">Log Akses</div>
        <div className="table-wrapper">
          <table className="tender-table">
            <thead>
              <tr>
                <th className="No1">No</th>
                <th className="No">Nama Konten</th>
                <th className="No">Waktu Posting</th>
              </tr>
            </thead>

            <AnimatePresence mode="wait">
              <motion.tbody
                key={`${currentPage}-${itemsPerPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="empty-message">
                      Tidak ada dokumen yang tersedia saat ini.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((doc, index) => (
                    <tr key={index} className="tender-row">
                      <td className="No-Doc">{doc.no}</td>
                      <td>
                        <a
                          href={doc.url}
                          download
                          className="tender-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.name}
                        </a><br/>
                        <p className="deskripsi">{doc.desc}</p>
                      </td>
                      <td>{doc.date}</td>
                    </tr>
                  ))
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="pagination-container">
          <label className="labelbawah" htmlFor="limitSelect">
            Tampilkan:
          </label>
          <select
            className="limitSelect"
            value={itemsPerPage}
            onChange={handleLimitChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
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

          <span className="kalimatbawah"> / {totalPages}</span>

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}