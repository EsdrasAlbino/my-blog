import { prismaInstance } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { title, content, published, authorId } = data;

  if (!title || !content) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }

  console.log("data", data);

  const post = await prismaInstance.post.create({
    data: {
      title,
      content,
      published : published || false,
      authorId: authorId || undefined,
      },
    },
  );

  return NextResponse.json(post);
}

export async function GET(request: NextRequest) {
  const id = request?.nextUrl.searchParams.get("id");

  if (id) {
    const post = await prismaInstance.post.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(post);
  } else {
    const posts = await prismaInstance.post.findMany();
    return NextResponse.json(posts);
  }
}

export async function PATCH(request: NextRequest) {
  const data = await request.json();
  const { id, title, content, published } = data;
    //vl@bufpe1n
  if (!id) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }

  const post = await prismaInstance.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      published,
    },
  });

  return NextResponse.json(post);
}
