// components/Tendertabs/TenderTabs.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { motion } from 'framer-motion';
import './TenderTabs.css';

const tabs = [
  { label: 'Detail', slug: '' },
  { label: 'Peserta', slug: 'peserta' },
  { label: 'Jadwal', slug: 'jadwal' },
  { label: 'Pemenang', slug: 'pemenang' },
];

export default function TenderTabs() {
  const router = useRouter();
  const { id } = router.query;
  const currentPath = router.asPath;
  const match = currentPath.match(/^\/(.*?)\//);
  const category = match?.[1] ?? 'tender';

  const baseUrl = `/${category}/${id}`;

  return (
    <div className="tender-tabs">
      {tabs.map((tab) => {
        const href = `${baseUrl}${tab.slug ? `/${tab.slug}` : ''}`;
        const isActive = currentPath === href;

        return (
          <Link key={tab.slug} href={href} className="tender-tab-link-wrapper">
            <div className={`tender-tab-link ${isActive ? 'is-active' : ''}`}>
              {tab.label}
              {isActive && (
                <motion.div
                  className="tender-tab-indicator"
                  layoutId="activeTabIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
