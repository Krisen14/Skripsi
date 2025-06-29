'use client';

import { motion } from 'framer-motion';
import './page.css';

export default function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
        
        <h2 className="modal-title">Hubungi Kami</h2>

        <p className="service-schedule">
          <strong>Jadwal Layanan Pendaftaran:</strong> 08.00 - 12.00 WIB <br />
          <em>(Pendaftaran akan ditutup jika kuota sudah mencapai batas)</em>
        </p>

        <div className="modal-section grid">
          <div>
            <strong>Senin - Kamis:</strong>08.00 - 15.00 WIB<br />
            Istirahat: 12.00 - 13.00 WIB
          </div>
          <div>
            <strong>Jumat:</strong>08.00 - 15.00 WIB<br />
            Istirahat: 11.30 - 13.30 WIB
          </div>
        </div>

        <h3 className="section-title">Kontak Informasi</h3>
        <div className="modal-section grid">
          <p><strong>Telepon:</strong> 021-3846788</p>
          <p><strong>FAX:</strong> 021-3823291</p>
          <p><strong>Email 1:</strong> helpdesk.lpsejkt@jakarta.go.id</p>
          <p><strong>Email 2:</strong> lpsedki@jakarta.go.id</p>
        </div>

        <h3 className="section-title">Update Informasi LPSE</h3>
        <div className="modal-section grid">
          <ul>
            <li><strong>Telegram:</strong> <br/> https://t.me/infolpsedkijakarta</li>
            <li><strong>Instagram:</strong> <br />@lpsedkijakarta</li>
          </ul>
          <ul>
            <li><strong>Penyedia:</strong> <br /> https://linktr.ee/lpsejakarta</li>
            <li><strong>Non-Penyedia:</strong> https://s.id/infolpsebppbjdkijakarta</li>
          </ul>
        </div>

        <div className="modal-footer">
          <p><strong>Alamat:</strong> Jl. Kebon Sirih No. 18, Jakarta Pusat</p>
          <p className="note">
            <strong>Catatan:</strong> Penyedia/Pelaku Usaha wajib membawa seluruh dokumen asli & scan warna yang dipersyaratkan saat verifikasi.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
