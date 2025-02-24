import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Find all products
        const products = await prisma.product.findMany();
        
        // Update each product that has no createdAt
        for (const product of products) {
            if (!product.createdAt) {
                await prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        createdAt: new Date()
                    }
                });
                console.log(`Updated product ${product.id}`);
            }
        }
        
        console.log('Finished updating products with null createdAt values');
    } catch (error) {
        console.error('Error:', error);
    }
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });
