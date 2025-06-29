'use client';

import { motion } from 'framer-motion';
import { useRef, useLayoutEffect, useState } from 'react';
import './page.css';

type TabKey = string;

type NavbartabsProps = {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
  tabs: Record<TabKey, string>;
};

export default function Navbartabs({ activeTab, onTabChange, tabs }: NavbartabsProps) {
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });


  useLayoutEffect(() => {
    const activeButton = tabRefs.current[activeTab];
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  return (
    <div className="tabs relative">
      {Object.entries(tabs).map(([key, label]) => (
        <button
          key={key}
          ref={(el) => (tabRefs.current[key] = el)}
          onClick={() => onTabChange(key)}
          className={`tab-button ${activeTab === key ? 'active' : ''}`}
        >
          {label}
        </button>
      ))}

      <motion.div
        className="tab-indicator"
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </div>
  );
}
