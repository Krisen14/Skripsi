import Head from "next/head";
import "./page.css";
import Navbar from "@/components/Navbar/navbar";

export default function HalamanTutorial() {
  return (
    <div className="body">
      <Navbar />
      <h1 className="title-abcd">Tutorial Pendaftaran E-Katalog</h1>
      <main className="tutorial-container">
          <section className="hero-section">
          <h1 className="hero-title">Panduan Video: Cara Menambahkan Produk di e-Katalog</h1>
          <p className="hero-description">
            Pelajari langkah-langkah mudah menambahkan produk Anda ke e-Katalog LKPP — agar bisa dibeli langsung oleh instansi pemerintah.
          </p>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/ziZEeDTS6mU"
              title="Tutorial e-Katalog"
              frameBorder="0"
              width="1260"
              height="540"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="info-box">
            <strong>💡 Info:</strong> Jika Anda ingin mengikuti tender pemerintah, Anda harus terdaftar di SPSE melalui LPSE. Jika Anda ingin menjual produk langsung ke pemerintah, Anda bisa mendaftar di e-Katalog melalui LKPP.
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-title">FAQ E-Katalog</div>
          <div className="faq-grid">
            <div className="faq-box">
              <h4>Bagaimana produk bisa tampil di e-Katalog?</h4>
              <p>Agar produk Anda muncul di e‑Katalog, Anda harus mendaftar sebagai penyedia, mengunggah produk melalui aplikasi e‑Purchasing, dan menunggu proses verifikasi LKPP.</p>
            </div>
            <div className="faq-box">
              <h4>Apa syarat jadi penyedia e-Katalog?</h4>
              <p>Anda harus memiliki NIB, NPWP, akun OSS aktif, serta dokumen legalitas usaha lainnya. Pendaftaran dilakukan melalui portal e‑Katalog LKPP.</p>
            </div>
            <div className="faq-box">
              <h4>Kenapa verifikasi saya ditolak?</h4>
              <p>Biasanya karena dokumen tidak lengkap, format produk salah, atau kategori produk tidak sesuai. Pastikan semua dokumen dan spesifikasi Anda sudah sesuai panduan LKPP.</p>
            </div>
            <div className="faq-box">
              <h4> Berapa lama proses verifikasi LKPP?</h4>
              <p>Proses verifikasi biasanya memakan waktu 7–14 hari kerja, tergantung kelengkapan dokumen dan antrean permohonan di sistem e‑Katalog.</p>
            </div>
            <div className="faq-box">
              <h4>Batas nilai pembelian langsung?</h4>
              <p>Batas maksimal pembelian langsung oleh instansi melalui e‑Katalog adalah Rp 200 juta untuk barang dan jasa lainnya, atau sesuai kebijakan terbaru LKPP.</p>
            </div>
            <div className="faq-box">
              <h4>Perlukah akun khusus e‑Katalog?</h4>
              <p>Ya, penyedia harus memiliki akun yang terdaftar di sistem e‑Katalog untuk bisa login dan mengunggah produk yang akan ditawarkan ke instansi pemerintah.</p>
            </div>

          </div>
        </section>

        <section className="compare-section">
          <div className="compare-title">Perbedaan LPSE Vs E-Katalog</div>
          <p className="compare-p">Berikut adalah perbedaan LPSE dan E-Katalog beserta contoh aspeknya</p>
          <table className="compare-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Aspek</th>
                <th>LPSE</th>
                <th>E-Katalog</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jenis Pengadaan</td>
                <td>Tender/Lelang Terbuka</td>
                <td>Pembelian Langsung (Non-Tender)</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Cocok Untuk</td>
                <td>Proyek Kompleks, Jasa Konsultan</td>
                <td>Barang Umum, Produk Siap Pakai</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Akses Website</td>
                <td>Melalui LPSE instansi (contoh: lpse.kemenkeu.go.id)</td>
                <td>katalog.lkpp.go.id</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Proses Seleksi</td>
                <td>Evaluasi Dokumen Dan Penawaran Dari Peneydia</td>
                <td>Verifikasi Administrasi & Teknis Produk</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Cara Daftar</td>
                <td>Buat Akun SPSE Di Website LPSE</td>
                <td>Gunakan Akun SPSE Untuk Login Ke E-Katalog</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Contoh Penggunaan</td>
                <td>Pembangunan Kantor, Pengadaan Konsultan</td>
                <td>Pengadaan Laptop, Printer, Alat Kesehatan</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Waktu Digunakan</td>
                <td>Saat Nilai Pengadaan Besar/Kompleks</td>
                <td>Saat Barang Sudah Tersedia Dan Sesuai Katalog</td>
              </tr>
                       
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
