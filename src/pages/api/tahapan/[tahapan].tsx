// pages/api/tender/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb2';
import { ObjectId } from 'mongodb';

function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { db } = await connectToDatabase();

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    const useObjectId = isValidObjectId(id);
    const filter = useObjectId ? { _id: new ObjectId(id) } : { _id: id };

    const tender = await db.collection('LPSE').findOne(filter);

    if (!tender) {
      return res.status(404).json({ message: 'Tender tidak ditemukan' });
    }

    res.status(200).json(tender);
  } catch (error) {
    console.error('Error fetch tender:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}
