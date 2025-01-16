import { prismaInstance } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[3];

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid post ID",
      },
      { status: 400 }
    );
  }

  const post = await prismaInstance.post.findUnique({
    where: {
      id,
    },
  });

  // Check if post exists
  if (!post) {
    return NextResponse.json(
      {
        success: false,
        error: "Post not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PATCH(request: NextRequest) {
  const data = await request.json();
  const { id, title, content, published, images } = data;

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
      image: images,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const { id } = data;

  if (!id) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }

  const post = await prismaInstance.post.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(post);
}
