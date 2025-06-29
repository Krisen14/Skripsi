// components/TenderContentWrapper.tsx
'use client';

import { useState } from 'react';
import TenderFilter from '@/components/searchbar/searchbar';

type TenderContentWrapperProps = {
  ListComponent: React.ComponentType<{ filters: Record<string, string> }>;
};

export default function TenderContentWrapper({ ListComponent }: TenderContentWrapperProps) {
  const [filters, setFilters] = useState<Record<string, string>>({
    search: '',
    pemenang: '',
    kategori: '',
    instansi: '',
    status: '',
    tahun: '',
  });

  return (
    <>
      <TenderFilter onFilterChange={setFilters} />
      <ListComponent filters={filters} />
    </>
  );
}
