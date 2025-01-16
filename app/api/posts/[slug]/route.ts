import { prismaInstance } from "@/lib/prismaClient";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {

  const id = request.url?.split("id=")[1]

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

export async function PATCH(request: NextApiRequest) {
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

export async function DELETE(request: NextApiRequest) {
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
