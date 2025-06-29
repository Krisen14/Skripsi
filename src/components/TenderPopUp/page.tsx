import React from 'react';
import './page.css'; // pakai css biasa

type TenderPopupProps = {
  tenderName: string;
  onClose: () => void;
};

const TenderPopup: React.FC<TenderPopupProps> = ({ tenderName, onClose }) => {
  return (
    <div className="popup-container">
      <h2 className="popup-title">{tenderName}</h2>

      <div className="section-header">Upload Dokumen</div>

      <div className="form-grid">
        <div className="form-group">
          <label>Surat Penawaran Harga</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label>Jadwal Pelaksanaan (Kurva S)</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label>Jaminan Penawaran</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label>Analisa Harga Satuan (AHS)</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label>Metode Pelaksanaan</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label>Daftar Personil Inti</label>
          <input type="file" />
        </div>
      </div>

      <div className="section-header">Pakta Integritas</div>
      <div className="pakta-text">
        <p>1. Tidak akan melakukan praktek KKN</p>
        <p>2. Akan melaporkan kepada pihak yang berwenang mengenai indikasi KKN di dalam proses lelang ini.</p>
        <p>3. Dalam proses pengadaan ini, berjanji tidak akan melakukan praktik KKN baik langsung maupun tidak langsung.</p>
      </div>

      <div className="popup-actions">
        <button className="btn-accept">✅ Setuju & Ikuti Tender</button>
        <button className="btn-decline" onClick={onClose}>❌ Tidak Setuju</button>
      </div>
    </div>
  );
};

export default TenderPopup;
