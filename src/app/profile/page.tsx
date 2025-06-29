import Navbar from "@/components/Navbar/navbar";
import ProfileTabs from "@/components/ProfileTabs/Profiletabs";
import './page.css';

export default function ProfileVendor(){
    return (
        <div>
        <Navbar />


        <div className="data-penyedia-container">
      <div className="section-header">Data Penyedia</div>

      <div className="data-section">
        <div className="section-subheader">
          Informasi Perusahaan
          <button className="edit-button">Edit Data</button>
        </div>
        <div className="data-grid">
          <div><strong>Nama Perusahaan:</strong> PT. Sukses Bersama Selalu</div>
          <div><strong>Alamat:</strong> Jl. Tarumanegara Blok D9 No. 9</div>
          <div><strong>Bentuk Usaha:</strong> CV</div>
          <div><strong>Kode POS:</strong> 11411</div>
        </div>
      </div>

      <div className="data-section">
        <div className="section-subheader">Informasi Pribadi</div>
        <div className="data-grid">
          <div><strong>User ID:</strong> example123456</div>
          <div><strong>NPWP:</strong> 01.234.567.8-999.000</div>
          <div><strong>No Telepon:</strong> +621234567890</div>
          <div><strong>Email:</strong> example@gmail.com</div>
          <div><strong>Password:</strong> ••••••••••</div>
          <div><strong>Kabupaten / Kota:</strong> Kebon Jeruk</div>
          <div><strong>Provinsi:</strong> Jakarta</div>
          <div><strong>No PKP:</strong> 1234567890123</div>
          <div><strong>No Fax:</strong> Rp 3.817.576.486</div>
        </div>
      </div>

      <div className="section-subheader legalitas-header">
        Informasi Legalitas & Administratif Perusahaan
      </div>
      <div className="data-instruction">
        Lengkapi dokumen berikut untuk memenuhi persyaratan administrasi dalam mengikuti tender dengan nilai di atas Rp2.500.000.000 sesuai ketentuan Perpres 16/2018 dan perubahannya.
      </div>

      <form className="legalitas-form">
        <div className="form-grid">
          <div className="form-group">
            <label>NPWP Perusahaan</label>
            <input className="fileinput" type="file" />
            <p className="form-note">
            <span className="form-note-icon">!</span>
            <em>Wajib atas nama badan usaha</em>
            </p>
          </div>
          <div className="form-group">
            <label>NIB (Nomor Induk Berusaha)</label>
            <input type="file" />
          </div>
          <div className="form-group">
  <label htmlFor="sbu" className="form-label">Sertifikat Badan Usaha (SBU)</label>
  <select id="sbu" className="custom-select">
    <option value="">Pilih jenis SBU</option>
    <option value="konstruksi">Konstruksi</option>
    <option value="konsultan">Konsultan</option>
    <option value="pengadaan">Pengadaan</option>
  </select>
  <input type="file" />
</div>
          <div className="form-group">
  <label htmlFor="sbu" className="form-label">Sertifikat Badan Usaha (SBU)</label>
  <select id="sbu" className="custom-select">
    <option value="">Pilih jenis SBU</option>
    <option value="konstruksi">Konstruksi</option>
    <option value="konsultan">Konsultan</option>
    <option value="pengadaan">Pengadaan</option>
  </select>
  <input type="file" />
</div>

          <div className="form-group">
            <label>Akta Pendirian & Perubahan</label>
            <input type="file" />
          </div>
          <div className="form-group">
            <label>SKK / SKT Personil Inti</label>
            <input type="file" />
          </div>
          <div className="form-group">
            <label>Sertifikat Domisili</label>
            <input type="file" />
          </div>
          <div className="form-group">
            <label>Rekening Perusahaan</label>
            <input className="norek" type="text" placeholder="Masukkan No Rekening Perusahaan" />
          </div>
          <div className="form-group">
            <label>Laporan Keuangan Tahunan (Terakhir)</label>
            <input type="file" />
          </div>
        </div>
      </form>
    </div>
</div>
    )
}