
import { prismaInstance } from "@/lib/prismaClient"
import bcrypt from "bcrypt"

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){

    const data = await request.json()
    const { name, email, password } = data
    console.log("ROUTE HANDLER", data)

    if(!name || !email || !password){
        return NextResponse.json("Dados inválidos.", { status: 400})
    }
    const isUserExists = await prismaInstance.user.findUnique({
        where: {
            email
        }
    })

    if(isUserExists){
        return NextResponse.json({ error: "E-mail já existente."}, { status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("HASHED PASSWORD", hashedPassword)
    
    const user = await prismaInstance.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })


    return NextResponse.json(user)
}