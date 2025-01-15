import { prismaInstance } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request?.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json("Invalid data.", { status: 400 });
  }
  const post = await prismaInstance.post.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json(post);
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
