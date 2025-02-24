import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
        }
    }
    
    console.log('Updated products with null createdAt values');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
