'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/navbar';
import Navbartabs from '@/components/Navbartabs/navbartabs'; // yang baru ini
import Footer from '@/components/Footer/footer';
import TenderContentWrapper from '@/components/TenderLayout/TenderLayout';

import ListTender from '@/components/ListTender/ListTender';
import ListNonTender from '@/components/ListNonTender/ListNonTender'; 
import ListDarurat from '@/components/ListPCT_Darurat/ListDarurat'; 
import ListPCTSwake from '@/components/ListPCT_Swakelola/ListPCTSwake';
import ListPCTNon from '@/components/ListPCT_NonTender/ListPCTNon'; 

import './page.css';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const listMap = {
  tender: ListTender,
  nontender: ListNonTender,
  pct_nontender: ListPCTNon,
  swakelola: ListPCTSwake,
  pct_darurat: ListDarurat,
};

const tabLabels = {
  tender: 'Tender',
  nontender: 'Non-Tender',
  pct_nontender: 'Pencatatan Non-Tender',
  swakelola: 'Pencatatan Swakelola',
  pct_darurat: 'Pencatatan Darurat',
};

type ListKey = keyof typeof listMap;

export default function TenderPage() {
  const [activeTab, setActiveTab] = useState<ListKey>('tender');
  const ActiveListComponent = listMap[activeTab];

  return (
    <div>
    <div className='body'>
      <section>
        <Navbar />
        <Navbartabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as ListKey)}
          tabs={tabLabels}
        />
      </section>

      <div className="container">
        <TenderContentWrapper ListComponent={ActiveListComponent} />
      </div>

      

    </div>
    <ScrollToTopButton />
    </div>
    
  );
}
