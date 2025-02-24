// pages/api/product/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';  // Prisma bağlantısı için import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'DELETE') {
    try {
      // Prisma ile ürünü silme işlemi
      const deletedProduct = await prisma.product.delete({
        where: {
          id: String(id),  // id'yi string'e dönüştürün
        },
      });

      // Başarılı işlem sonucu
      return res.status(200).json({ message: `Product ${id} deleted successfully` });
    } catch (error) {
      // Hata durumunda
      console.error("Hata:", error);
      return res.status(500).json({ error: 'Failed to delete the product' });
    }
  } else {
    // Geçersiz metod durumu
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
