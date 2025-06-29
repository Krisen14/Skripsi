'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/navbar';
import PaginationController from '@/components/Pagination/page';
import './page.css';

interface Announcement {
  id: number;
  date: string; // format: 'YYYY-MM-DD'
  title: string;
  excerpt: string;
  time: string;
}

const allAnnouncements: Announcement[] = Array(53).fill(null).map((_, i) => ({
  id: i + 1,
  date: '2025-06-20',
  title: 'Pemberitahuan Rencana Pengadaan Kualifikasi Calon Penyedia Jasa Revitalisasi Ruang Kantor',
  excerpt: 'Pemberitahuan Rencana Pengadaan Kualifikasi Calon Penyedia Jasa Revitalisasi Ruang Kantor……',
  time: '18:07 WIB',
}));

export default function Pengumuman() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = allAnnouncements.slice(startIdx, startIdx + itemsPerPage);

  const handleTitleClick = (id: number) => {
    router.push(`/pengumuman/${id}`);
  };

  return (
    <>
      <div className="body">
        <Navbar />
        <div className="pengumuman-container">
          <h1 className="title-abcd">Daftar Pengumuman</h1>
          <div className="announcement-list">
            {paginatedData.map((item) => {
              const dateObj = new Date(item.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString('default', { month: 'short' });
              const year = dateObj.getFullYear().toString().slice(-2);

              return (
                <div key={item.id} className="announcement-card">
                  <div className="date-box">
                    <div className="date-day">{day}</div>
                    <div className="date-month-year">{month}<br />{year}</div>
                  </div>
                  <div className="announcement-content">
                    <h3
                      className="announcement-title clickable"
                      onClick={() => handleTitleClick(item.id)}
                    >
                      {item.title}
                    </h3>
                    <p className="announcement-excerpt">{item.excerpt}</p>
                    <p className="announcement-time">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <PaginationController
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={allAnnouncements.length}
            onLimitChange={setItemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
