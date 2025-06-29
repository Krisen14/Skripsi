'use client';

import { motion } from 'framer-motion';
import './page.css';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';

export default function ContactUs() {
  return (
    <div>
      <Navbar />
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Jadwal Pelayanan Verifikasi Data dan Helpdesk</h2>
          <table className="jadwal-table">
            <thead>
              <tr>
                <th className='NoKet'>Keterangan</th>
                <th>Hari</th>
                <th>Jam Layanan</th>
                <th>Jam Istirahat</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='NoKet'>Pendaftaran</td>
                <td>Semua Hari</td>
                <td>08:00-12:00 WIB</td>
                <td>12:00-13:00 WIB</td>
                <td className="highlight">Akan Ditutup Jika Kuota Penuh</td>
              </tr>
              <tr>
                <td className='NoKet'>Operasional</td>
                <td>Senin - Kamis</td>
                <td>08:00-15:00 WIB</td>
                <td>11:30-13:30 WIB</td>
                <td>-</td>
              </tr>
              <tr>
                <td className='NoKet'>Operasional</td>
                <td>Jumat</td>
                <td>08:00-15:00 WIB</td>
                <td>11:30-13:30 WIB</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
          <p className='deskripsi'><strong>Catatan:</strong>Penyedia/ Pelaku Usaha wajib membawa seluruh dokumen asli & scan warna yang dipersyaratkan pada saat pelaksanaan verifikasi.</p>
          

          <div className="maps-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.273743116576!2d106.82583137499005!3d-6.182348093805144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42dce060d93%3A0x8d0be02811aed5d9!2sLPSE%20Provinsi%20DKI%20Jakarta!5e1!3m2!1sid!2sid!4v1750000106499!5m2!1sid!2sid"
    width="960px"
    height="540"
    style={{ border: 15 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

<div className="table2container">
  <div className="label-cell">ALAMAT:</div>
  <div className="address-cell">
    Jl. Kebon Sirih No. 18, Gedung Balaikota Blok H Lantai 19, Jakarta Pusat
  </div>
</div>


<div>
<h2 className="section-title">Kontak Informasi</h2>
          <table className="jadwal-table">
            <thead>
              <tr>
                <th className='NoKet'>No</th>
                <th>Kontak</th>
                <th>Nomor Kontak</th>
                <th>Email</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='NoKet'>1</td>
                <td>No-Telp</td>
                <td>021-3846788</td>
                <td>helpdesk.lpsejkt@jakarta.go.id (untuk penyedia / pelaku usaha)</td>
              </tr>
              <tr>
                <td className='NoKet'>2</td>
                <td>No-Fax</td>
                <td>08:00-15:00 WIB</td>
                <td>lpsedki@jakarta.go.id (untuk non penyedai)</td>

              </tr>
              <tr>

              </tr>
            </tbody>
          </table>
</div>
        </motion.div>
      </div>
  );
}
