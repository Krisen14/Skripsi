'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import './Profiletabs.css';

const tabs = [
  { label: 'Data Penyedia', slug: '' },
  { label: 'Log Akses', slug: 'Log-Akses' },
  { label: 'Inbox', slug: 'Inbox' },
  { label: 'Tender Saya', slug: 'Tender-Saya' },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <div className="tender-tabs">
      {tabs.map((tab) => {
        const href = `/profile/${tab.slug}`;
        const isActive = pathname === href;

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
