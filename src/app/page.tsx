import Image from "next/image";
import './page.css';
import Navbar from "@/components/Navbar/navbar";
import Link from "next/link";
import Footer from "@/components/Footer/footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import type { AppProps } from 'next/app';
import List from "@/components/List/List";
import Carousel from "@/components/Carousel/carousel";
import { Url } from "next/dist/shared/lib/router/router";


interface Announcement {
  date: string;
  monthYear: string;
  title: string;
  time: string;
  link: string;
}

interface InfoItem {
  title: string;
  buttonLabel: string;
  color?: string;
  icon?: string; // Optional if you want to use icons
  href?: Url;
}

const infoItems: InfoItem[] = [
  { title: 'Semua Pelayanan LPSE Tidak Dipungut Biaya', buttonLabel: 'Lapor Disini' },
  { title: 'Informasi Untuk Penyedia LPSE', buttonLabel: 'Klik Disini', href:"/informasilainnya"},
  { title: 'Panduan SPSE 4.5 Bagi Penyedia/Non Penyedia', buttonLabel: 'Klik Disini' },
  { title: 'Himbauan Penggunaan Fitur 2FA Bagi Seluruh Pengguna SPSE', buttonLabel: 'Klik Disini' },
  { title: 'Pengumuman RUP Dan Pelaksanaan PBJ TA 2025', buttonLabel: 'Lapor Disini' },
  { title: 'Pelaksanaan Penilaian Kinerja Penyedia Tahun 2024', buttonLabel: 'Klik Disini' },
];


const announcements: Announcement[] = [
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
  {
    date: '20',
    monthYear: 'Jun 25',
    title: 'Pemberitahuan Awal Perubahan Domain Aplikasi SPSE – LPSE Provinsi DKI Jakarta',
    time: '18:07 wib',
    link: '#', // Ganti dengan link aktual
  },
];

export default function Home() {


  return (
    <div>
      <Navbar />

      <div>
        <Carousel />
      </div>


      <div className="info-grid">
      {infoItems.map((item, index) => (
        <div key={index} className="info-card">
          <div className="icon-placeholder" />
          <div className="title-placeholder">
          <p className="info-title">{item.title}</p>
          </div>
          {item.href ? (
            <Link href={item.href}>
              <button className="info-button">{item.buttonLabel}</button>
            </Link>
          ) : (
            <button className="info-button">{item.buttonLabel}</button>
          )}
        </div>
      ))}
    </div>


      <div className="announcement-section">
      <div className="announcement-header">
        <h2>Pengumuman Dan Berita</h2>
        <a href="#" className="see-all-link">Lihat Semua</a>
      </div>

      <div className="announcement-grid">
        {announcements.map((item, index) => (
          <div key={index} className="announcement-card">
            <div className="announcement-date">
              <div className="date-number">{item.date}</div>
              <div className="date-month">{item.monthYear}</div>
            </div>
            <div className="announcement-content">
              <a href={item.link} className="announcement-title">
                {item.title}
              </a>
              <p className="announcement-time">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


      <Footer />
      <ScrollToTopButton />
    </div>
    
  );
}