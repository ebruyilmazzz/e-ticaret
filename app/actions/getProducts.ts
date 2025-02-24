import prisma from '@/libs/prismadb'

export interface IProductParams{
    category?: string | null
    search?: string | null
}

export default async function getProducts(params:IProductParams) {
    try {
        const {category, search} = params;
        let searchString = search;
        if(!search){
           searchString = ""
        }
        let query: any = {}

        if(category){
            query.category = category
        }
        const products = await prisma.product.findMany({
            where: {
              ...query,
              OR: [
                {
                  name: {
                    contains: searchString,
                    mode: 'insensitive',
                  },
                  description: {
                    contains: searchString,
                    mode: 'insensitive',
                  },
                },
              ],
              createdAt: {
                // Örnek olarak bir tarih filtresi ekleyebilirsiniz
                gte: new Date('2025-01-01T00:00:00Z'),
              },
            },
            include: {
              reviews: {
                include: {
                  user: true,
                },
                orderBy: {
                  createdDate: 'desc',
                },
              },
            },
          });
          
        return products;
    } catch (error: any) {
        throw new Error(error)
    }
}