import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Tüm alanlar zorunludur!" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Bu e-posta zaten kullanılıyor!" }, { status: 400 });
        }

        // Şifreyi hashle (bcrypt kullanımı optimize edildi)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluştur
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });

        return NextResponse.json(user, { status: 201 });

    } catch (error) {
        console.error("Kullanıcı kaydı sırasında hata:", error);
        return NextResponse.json({ error: "Sunucu hatası oluştu!" }, { status: 500 });
    }
}
