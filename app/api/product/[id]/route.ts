import prisma from '@/libs/prismadb'
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";



export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) return NextResponse.json({ error: "ID gerekli" }, { status: 400 });

        await prisma.product.delete({ where: { id } });

        return NextResponse.json({ success: true, message: "Ürün silindi" });
    } catch (error) {
        return NextResponse.json({ error: "Ürün silinirken hata oluştu" }, { status: 500 });
    }
}