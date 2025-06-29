'use client';

import { useEffect, useState } from 'react';

interface PaketListProps {
  filters: Record<string, string>;
  tipe: string; // "tender", "nontender", "pct_darurat", dst
}

interface PaketData {
  _id: string;
  namaTender: string;
  instansi: string;
  // tambahkan properti lain sesuai struktur koleksi kamu
}

export default function PaketList({ filters, tipe }: PaketListProps) {
  const [data, setData] = useState<PaketData[]>([]);
  const [loading, setLoading] = useState(true);

  const queryString = new URLSearchParams(filters).toString();
  const endpoint = `/api/${tipe}?${queryString}`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Gagal fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {data.length === 0 ? (
        <p>Tidak ada paket ditemukan</p>
      ) : (
        <ul>
          {data.map((paket) => (
            <li key={paket._id}>
              <h2>{paket.namaTender}</h2>
              <p>{paket.instansi}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
