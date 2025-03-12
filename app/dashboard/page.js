"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (session) {
      fetch("/api/links")
        .then((res) => res.json())
        .then((data) => setLinks(data.links));
    }
  }, [session]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  const handleShorten = async (e) => {
    e.preventDefault();
    setShortUrl("");

    const res = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url, customSlug }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
      setLinks([
        ...links,
        { slug: customSlug || data.shortUrl.split("/").pop(), url },
      ]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome, <strong>{session.user.email}</strong>!
        </p>
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>

        {/* Shorten Link Form */}
        <form onSubmit={handleShorten} className="mt-6">
          <input
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Custom slug (optional)"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Shorten
          </button>
        </form>

        {/* Show Shortened Link */}
        {shortUrl && (
          <div className="mt-4">
            <p className="text-green-600 font-bold">Short URL:</p>
            <a
              href={shortUrl}
              className="text-blue-500 underline"
              target="_blank"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {/* List of Shortened Links */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Your Links</h2>
          {links.map((link, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <div className="border p-2 rounded mb-2">
                <a
                  href={`/${link.slug}`}
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  {`http://localhost:3000/${link.slug}`}
                </a>
                <p className="text-gray-600">Clicks: {link.clicks}</p>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
