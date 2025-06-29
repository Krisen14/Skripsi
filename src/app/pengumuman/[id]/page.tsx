'use client';

import Navbar from '@/components/Navbar/navbar';
import { useParams } from 'next/navigation';

export default function PengumumanDetail() {
  const params = useParams();
  const { id } = params;
  const title = params

  return (

    <>
    <Navbar />    
      <div style={{ padding: '2rem' }}>
      <h1>Detail Pengumuman #{id}</h1>
      
    </div>
    </>

  );
}
