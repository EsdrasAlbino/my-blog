
import { prismaInstance } from "@/lib/prismaClient"
import bcrypt from "bcrypt"

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){

    const data = await request.json()
    const { name, email, password } = data

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
    
    const user = await prismaInstance.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })


    return NextResponse.json(user)
}

export async function GET(request: NextRequest){
    const email = request.nextUrl.searchParams.get("email")
    if(!email){
        return NextResponse.json({ error: "E-mail não informado."}, { status: 400})
    }
    const users = await prismaInstance.user.findUnique({
        where: {
            email: email
        }
    })
    return NextResponse.json(users)
}