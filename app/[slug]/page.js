import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function Page({ params }) {
  try {
    const { slug } = params;

    // Fetch the original URL from Prisma
    const link = await prisma.link.findUnique({
      where: { slug },
    });

    if (!link) {
      return (
        <h1 className="text-2xl text-center mt-10">404 - Link Not Found</h1>
      );
    }

    // Increase click count (optional)
    await prisma.link.update({
      where: { slug },
      data: { clicks: { increment: 1 } },
    });

    // Redirect to the original URL
    redirect(link.url);
  } catch (error) {
    console.error("Redirect Error:", error); // 🔥 Debugging Log
    return (
      <h1 className="text-2xl text-center mt-10">Internal Server Error</h1>
    );
  }
}
