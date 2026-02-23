import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

export async function POST(request:Request){
    const  body = await request.json();
    const{email, password} =body;

    const user = await prisma.user.findUnique({
        where:{email},
    })

    if(!user){
        return Response.json({message: "User does not exist"}, {status:400})
    }

    if(!user.isActive){
        return Response.json({message: "User is deactivated"}, {status: 403})
    }

    const hashedPassword = hashPassword(password)

    if(user.password !== hashedPassword){
        return Response.json({message:"Wrong Credentials"}, {status:401})
    }

    return Response.json({message: "Login Successful", email: user.email},
        {status: 200}
    )
}