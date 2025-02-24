import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                brand: true,
                category: true,
                inStock: true,
                image: true,
                reviews: true,
                createdAt: true,
                updatedAt: true
            }
        });

        // Convert dates to ISO string format
        const formattedProducts = products.map(product => ({
            ...product,
            createdAt: product.createdAt?.toISOString(),
            updatedAt: product.updatedAt?.toISOString()
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("Ürünleri çekerken hata oluştu:", error);
        return NextResponse.json({ error: "Ürünleri getirirken hata oluştu" }, { status: 500 });
    }
}