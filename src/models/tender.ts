import mongoose from 'mongoose';

const tenderSchema = new mongoose.Schema({
  kodeTender: String,
  namaTender: String,
  instansi: String,
  tahapan: String,
  kategori: String,
  nilaiPagu: Number,
  status: String,
  tahunAnggaran: Number,
  // tambahkan fields lain jika ada
});

export default mongoose.models.Tender || mongoose.model('Tender', tenderSchema);
