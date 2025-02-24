import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, price, category, brand, inStock, image, description } = body;

        const product = await prisma.product.create({
            data: {
                name,
                price,
                category,
                brand,
                inStock,
                image,
                description: description || 'No description available',
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Ürün eklerken hata oluştu:", error);
        return NextResponse.json({ 
            error: "Ürün eklerken hata oluştu", 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
