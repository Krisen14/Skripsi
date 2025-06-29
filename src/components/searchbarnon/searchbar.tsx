'use client';

import { useState, useEffect } from 'react';
import './searchbar.css';

type TenderFilterProps = {
  onFilterChange: (filters: Record<string, string>) => void;
};

export default function NonTenderFilter({ onFilterChange }: TenderFilterProps) {
  const [filters, setFilters] = useState({
    search: '',
    pemenang: '',
    kategori: '',
    instansi: '',
    status: '',
    tahun: '',
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="filter-container">
      <input
        name="pemenang"
        value={filters.pemenang}
        onChange={handleChange}
        placeholder="Cari Nama Pemenang..."
        className="filter-input"
      />
      <select name="kategori" value={filters.kategori} onChange={handleChange} className="filter-input">
        <option value="">Semua Jenis Pengadaan</option>
        <option value="Jasa Konstruksi">Jasa Konstruksi</option>
        <option value="Barang">Barang</option>
        <option value="Jasa Lainnya">Jasa Lainnya</option>
      </select>
      <input
        name="instansi"
        value={filters.instansi}
        onChange={handleChange}
        placeholder="Instansi"
        className="filter-input"
      />
      <select name="status" value={filters.status} onChange={handleChange} className="filter-input">
        <option value="">Semua Status</option>
        <option value="Selesai">Selesai</option>
        <option value="Sedang Berjalan">Berjalan</option>
        <option value="Gagal">Dibatalkan</option>
      </select>
      <input
        name="tahun"
        type="number"
        value={filters.tahun}
        onChange={handleChange}
        placeholder="Tahun Anggaran"
        className="filter-input"
      />
    </div>
  );
}
