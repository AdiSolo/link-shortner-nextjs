export const dynamic = "force-dynamic"; // Ensures real-time fetching

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import scrapeMetadata from "metadata-scraper";

const prisma = new PrismaClient();

export async function generateMetadata({ params }) {
  const { slug } = params;
  const link = await prisma.link.findUnique({
    where: { slug },
  });

  if (!link) {
    return {
      title: "404 - Link Not Found",
      description: "This short link does not exist.",
    };
  }

  try {
    const metadata = await scrapeMetadata(link.url);
    return {
      title: metadata.title || "Check this out!",
      description: metadata.description || "A great link to explore.",
      openGraph: {
        title: metadata.title || "Check this out!",
        description: metadata.description || "A great link to explore.",
        images: [
          {
            url: metadata.image || "/default-preview.png",
          },
        ],
        url: link.url,
      },
      twitter: {
        card: "summary_large_image",
        title: metadata.title || "Check this out!",
        description: metadata.description || "A great link to explore.",
        images: metadata.image ? [metadata.image] : ["/default-preview.png"],
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Shortened Link",
      description: "Click to view the full link.",
    };
  }
}

export default async function RedirectPage({ params }) {
  const { slug } = params;
  const link = await prisma.link.findUnique({
    where: { slug },
  });

  if (!link) {
    return <h1 className="text-2xl text-center mt-10">404 - Link Not Found</h1>;
  }

  // Increment click count
  await prisma.link.update({
    where: { slug },
    data: { clicks: { increment: 1 } },
  });

  redirect(link.url);
}
