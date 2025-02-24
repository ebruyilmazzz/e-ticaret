import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Use raw query to update all products with null createdAt
        const result = await prisma.$runCommandRaw({
            update: "Product",
            updates: [
                {
                    q: { createdAt: null },
                    u: { $set: { createdAt: new Date() } },
                    multi: true
                }
            ]
        });
        
        console.log('Update result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });
