import { prismaInstance } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data || typeof data !== "object") {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { title, content, published, authorId, images } = data;

  if (!title || !content || !images || !authorId) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }

  const dataDB = {
    title: title ,
    content: content,
    image: images || "",
    authorId: authorId || "",
    published: Boolean(published) || false,
  };
  const post = await prismaInstance.post.create({
    data: dataDB,
  });

  return NextResponse.json(post);
}

export async function GET(request: NextRequest) {
  console.log("request", request.body);
  const posts = await prismaInstance.post.findMany();
  return NextResponse.json(posts);
}
