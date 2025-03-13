import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function RedirectPage({ params }) {
  try {
    const { slug } = params;

    // Find the original URL from the database
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
    console.error("Redirection error:", error); // 🔥 Log errors
    return (
      <h1 className="text-2xl text-center mt-10">Internal Server Error</h1>
    );
  }
}
