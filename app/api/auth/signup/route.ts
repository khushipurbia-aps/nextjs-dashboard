import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

export async function POST(request: Request){
    const body = await request.json();
    const {email, password} = body;

    const existingUser = await prisma.user.findUnique({
        where: {email},
    });

    if(existingUser){
        return Response.json({message: "User already exists"}, {status:400})
    }

    const hashedPassword = hashPassword(password);

    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            isActive: true
        }
    })
    return Response.json({message: "Account successfully created"}, {status: 201})
}