// components/DetailLayout/TenderDetailLayout.tsx
'use client';

import React from 'react';
import Navbar from '@/components/Navbar/navbar';
import TenderTabs from '@/components/Tendertabs/TenderTabs';

type Props = {
  children: React.ReactNode;
};

export default function TenderDetailLayout({ children }: Props) {
  return (
    <div className="container">
      <Navbar />
      <TenderTabs />
      <div className="detail-container">
        {children}
      </div>
    </div>
  );
}
