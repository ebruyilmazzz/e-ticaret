import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fetchFirebaseProducts } from "@/app/actions/fetchFirebaseProducts";
import { Product } from "@/app/types"; // Import the Product type

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const products: Product[] = await fetchFirebaseProducts();

        if (!products || products.length === 0) {
            return NextResponse.json({ message: "No products to migrate" }, { status: 200 });
        }

        for (const product of products) {
            await prisma.product.upsert({
                where: { id: product.id },
                update: {
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    brand: product.brand,
                    inStock: product.inStock,
                    image: product.image,
                    description: product.description || 'No description available',
                },
                create: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    brand: product.brand,
                    inStock: product.inStock,
                    image: product.image,
                    description: product.description || 'No description available',
                }
            });
        }

        await prisma.$disconnect();

        return NextResponse.json({ message: "Ürünler Prisma'ya aktarıldı!" }, { status: 200 });
    } catch (error) {
        console.error("Migration error:", error);
        return NextResponse.json({ error: "Hata oluştu!" }, { status: 500 });
    }
};
