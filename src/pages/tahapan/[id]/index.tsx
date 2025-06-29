//pages/api/tahapan/[tahapan.tsx]

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TahapanDetail() {
  const router = useRouter();
  const { tahapan } = router.query;

  const [dataTahapan, setDataTahapan] = useState<any>(null);

  useEffect(() => {
    if (!tahapan) return;

    // fetch atau filter data tahapan
    fetch(`/api/tahapan/${tahapan}`)
      .then((res) => res.json())
      .then((data) => setDataTahapan(data))
      .catch(() => setDataTahapan(null));
  }, [tahapan]);

  if (!dataTahapan) return <p>Loading atau Tahapan tidak ditemukan</p>;

  return (
    <div>
      <h1>Detail Tahapan: {tahapan}</h1>
      {/* tampilkan detail tahapan */}
      <pre>{JSON.stringify(dataTahapan, null, 2)}</pre>
    </div>
  );
}
