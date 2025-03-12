import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, customSlug } = await req.json();

  if (!url) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  let slug = customSlug || nanoid(6); // Generate random slug if none provided

  // Check if slug already exists
  const existingLink = await prisma.link.findUnique({
    where: { slug },
  });

  if (existingLink) {
    return Response.json(
      { error: "Custom slug already taken" },
      { status: 400 }
    );
  }

  // Store link in database
  const newLink = await prisma.link.create({
    data: {
      slug,
      url,
      userId: session.user.id,
    },
  });

  return Response.json({ shortUrl: `${process.env.NEXTAUTH_URL}/${slug}` });
}
