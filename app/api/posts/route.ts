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
  console.log("data", data);
  if (!title || !content || !images) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }

  const post = await prismaInstance.post.create({
    data: {
      ...data,
      image: images || "",
      authorId: authorId || "",
      published: published || false,
    },
  });
  console.log("post", post);

  return NextResponse.json(post);
}

export async function GET(request: NextRequest) {
  const posts = await prismaInstance.post.findMany();
  return NextResponse.json(posts);
}
