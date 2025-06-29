import Navbar from "@/components/Navbar/navbar";
import ProfileTabs from "@/components/ProfileTabs/Profiletabs";
import './page.css';

export default function GantiPassword(){
    return (
        <div>
        <Navbar />
        <ProfileTabs />

        <div className="data-penyedia-container">
      <div className="section-header">Data Penyedia</div>
      <div className="ubah-password-container">
        <h2>Masukkan Password Sekarang</h2>
        <input type="password" placeholder="Password Sekarang" />
        <div className="info-row">
          <span className="icon">❗</span>
          <span>Jika Anda Lupa Password Yang Sekarang <a href="#">Klik Disini</a></span>
        </div>

        <h2>Masukkan Password Baru</h2>
        <input type="password" placeholder="Masukkan Password Baru" />
        <div className="info-row">
          <span className="icon">❗</span>
          <span>Minimal 8 Karakter Huruf</span>
        </div>

        <input type="text" placeholder="" className="disabled-input" disabled />
        <span className="note">Password Belum Dibuat</span>

        <h2>Masukkan Password Kembali</h2>
        <input type="password" placeholder="Masukkan Kembali Password" />
        <div className="info-row">
          <span className="icon">❗</span>
          <span>Password Harus Sama Dengan Yang Dibuat</span>
        </div>

        <button className="simpan-btn">
          <span className="btn-icon">💾</span>
          Simpan Password
        </button>
      </div>
      </div>
      </div>
    );
}
