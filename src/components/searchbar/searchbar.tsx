'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Select, { SingleValue } from 'react-select';
import './searchbar.css';
import { useDebouncer } from '@/hooks/UseDebouncer';

/* ---------- opsi dropdown ---------- */
const kategoriOptions = [
  { value: '', label: 'Semua Jenis Pengadaan' },
  { value: 'Jasa Konstruksi', label: 'Jasa Konstruksi' },
  { value: 'Barang', label: 'Barang' },
  { value: 'Jasa Lainnya', label: 'Jasa Lainnya' },
  { value: 'Pekerjaan Konstruksi', label: 'Pekerjaan Konstruksi' },
];

const statusOptions = [
  { value: '', label: 'Semua Status' },
  { value: 'Selesai', label: 'Selesai' },
  { value: 'Sedang Berjalan', label: 'Sedang Berjalan' },
  { value: 'Gagal', label: 'Dibatalkan' },
];

type TenderFilterProps = {
  onFilterChange: (filters: Record<string, string>) => void;
};

export default function TenderFilter({ onFilterChange }: TenderFilterProps) {
  const [tempFilters, setTempFilters] = useState({
    search: '',
    pemenang: '',
    kategori: '',
    instansi: '',
    status: '',
    tahun: '2025',
  });

  /* --------- debouncers --------- */
  const debouncedSearch   = useDebouncer(tempFilters.search,   300);
  const debouncedPemenang = useDebouncer(tempFilters.pemenang, 300);
  const debouncedInstansi = useDebouncer(tempFilters.instansi, 300);
  const debouncedTahun    = useDebouncer(tempFilters.tahun,    300);

  const [finalFilters, setFinalFilters] = useState(tempFilters);

  /* sinkronkan debounce -> finalFilters */
  useEffect(() => {
    setFinalFilters(prev => ({
      ...prev,
      search:   debouncedSearch,
      pemenang: debouncedPemenang,
      instansi: debouncedInstansi,
      tahun:    debouncedTahun,
    }));
  }, [debouncedSearch, debouncedPemenang, debouncedInstansi, debouncedTahun]);

  /* push ke parent */
  useEffect(() => {
    onFilterChange(finalFilters);
  }, [finalFilters, onFilterChange]);

  /* ---------- handlers ---------- */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempFilters(prev => ({ ...prev, [name]: value }));
  };

  /* react-select mengembalikan option | null */
  const handleSelectChange = (
    field: 'kategori' | 'status',
    option: SingleValue<{ value: string; label: string }>
  ) => {
    const value = option?.value ?? '';
    setTempFilters(prev => ({ ...prev, [field]: value }));
    setFinalFilters(prev => ({ ...prev, [field]: value })); // apply segera
  };

  return (
    <div className='body'>
    <div className="filter-container">
      <input
        name="search"
        value={tempFilters.search}
        onChange={handleInputChange}
        placeholder="Cari Nama Tender..."
        className="filter-input"
      />

      <input
        name="pemenang"
        value={tempFilters.pemenang}
        onChange={handleInputChange}
        placeholder="Cari Nama Pemenang..."
        className="filter-input"
      />

      {/* ---- react-select kategori ---- */}
      <Select
        options={kategoriOptions}
        className="react-select"
        placeholder="Semua Jenis Pengadaan"
        onChange={opt => handleSelectChange('kategori', opt)}
        value={kategoriOptions.find(o => o.value === tempFilters.kategori)}
      />

      <input
        name="instansi"
        value={tempFilters.instansi}
        onChange={handleInputChange}
        placeholder="Instansi"
        className="filter-input"
      />

      {/* ---- react-select status ---- */}
      <Select
        options={statusOptions}
        className="react-select"
        placeholder="Semua Status"
        onChange={opt => handleSelectChange('status', opt)}
        value={statusOptions.find(o => o.value === tempFilters.status)}
      />

      <input
        name="tahun"
        type="number"
        value={tempFilters.tahun}
        onChange={handleInputChange}
        placeholder="Tahun Anggaran"
        className="filter-input"
      />
    </div>
    </div>
  );
}
