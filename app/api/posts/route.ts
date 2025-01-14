import { prismaInstance } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { title, content, published, authorId } = data;

  if (!title || !content) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }

  const post = await prismaInstance.post.create({
    data: {
      title,
      content,
      published: published || false,
      authorId: authorId || undefined,
    },
  });

  return NextResponse.json(post);
}

export async function GET(request: NextRequest) {
  const posts = await prismaInstance.post.findMany();
  return NextResponse.json(posts);
}
