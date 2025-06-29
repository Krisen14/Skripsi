'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/navbar';
import LpseNavbar from '@/components/Navbartabs/navbartabs';
import ListNonTender from '@/components/ListNonTender/ListNonTender';
import NonTenderFilter from '@/components/searchbarnon/searchbar';

export default function PencatatanSwakelola() {
  const [filters, setFilters] = useState<Record<string, string>>({
    search: '',
    pemenang: '',
    kategori: '',
    instansi: '',
    status: '',
    tahun: '',
  });

  return (
    <><div>
      <Navbar />
      <LpseNavbar />
    </div>
    <div className="max-w-7xl mx-auto px-4 py-6">
        <NonTenderFilter onFilterChange={setFilters} />
        <ListNonTender filters={filters}/>
      </div></>
  );
}
