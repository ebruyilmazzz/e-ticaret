import { getCurrentUser } from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
        console.log("Yetkisiz giriş denemesi.");
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    try {
        const body = await request.json();
        console.log("Gelen body:", body);

        const { name, description, brand, category, price, inStock, image } = body;

        if (!name || !description || !brand || !category || !price || !image) {
            const missingFields = [];
            if (!name) missingFields.push('name');
            if (!description) missingFields.push('description');
            if (!brand) missingFields.push('brand');
            if (!category) missingFields.push('category');
            if (!price) missingFields.push('price');
            if (!image) missingFields.push('image');
            
            console.log("Eksik alanlar:", missingFields);
            return NextResponse.json({ 
                error: "Eksik alanlar mevcut", 
                missingFields 
            }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                brand,
                category,
                price: parseFloat(price),
                inStock: inStock || false,
                image,
            }
        });

        console.log("Ürün başarıyla eklendi:", product);
        return NextResponse.json(product);
    } catch (error) {
        console.error("Veritabanı hatası:", error);
        return NextResponse.json({ 
            error: "Veritabanına eklenirken hata oluştu",
            details: error instanceof Error ? error.message : "Bilinmeyen hata"
        }, { status: 500 });
    }
}
