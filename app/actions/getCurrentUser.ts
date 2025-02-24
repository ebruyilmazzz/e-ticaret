import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!currentUser) {
            return null;
        }

        // Hydration hatasını önlemek için tarihleri string olarak döndür
        return JSON.parse(JSON.stringify({
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null,
        }));

    } catch (error: any) {
        console.error("getCurrentUser hatası:", error);
        return null;
    }
}
