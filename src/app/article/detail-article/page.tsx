"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  title: string;
  date: string;
  description: string;
  categories: string[];
  image: string;
}

const articles: Article[] = [
  {
    title: "Cybersecurity Essentials Every Developer Should Know",
    date: "April 13, 2025",
    description:
      "Protect your apps and users with these fundamental cybersecurity practices for...",
    categories: ["Technology", "Design"],
    image: "/images/thumb-1.jpg",
  },
  {
    title: "The Future of Work: Remote-First Teams and Digital Tools",
    date: "April 10, 2025",
    description:
      "How tech companies are optimizing remote collaboration with smarter tools and processes",
    categories: ["Technology", "Design"],
    image: "/images/thumb-2.jpg",
  },
  {
    title: "Design Systems: Why Your Team Needs One in 2025",
    date: "April 9, 2025",
    description:
      "Learn how design systems save time, ensure consistency, and scale design efforts...",
    categories: ["Technology", "Design"],
    image: "/images/thumb-3.jpg",
  },
];

const ArticleDetail: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-blue-700">Loopgum</div>
        <div className="text-sm text-gray-600">Jane Dean</div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <p className="text-xs text-gray-500 mb-2">
          February 5, 2025 • Creativity & Admin
        </p>
        <h1 className="text-2xl font-bold mb-4">
          Figma’s New Dev Mode: A Game-Changer for Designers & Developers
        </h1>
        <img
          src="/images/article-hero.jpg"
          alt="Designer working on dual monitors"
          className="w-full rounded mb-4"
        />

        <article className="space-y-4 text-sm text-gray-800">
          <p>
            In the ever-evolving world of digital product design, collaboration
            between designers and developers has always been crucial — and often
            challenging. But Figma’s latest innovation, Dev Mode, is set to
            change the game entirely.
          </p>
          <p>
            Dev Mode is a new workspace within Figma tailored specifically for
            developers. It allows them to easily inspect design files, access
            code snippets, and collaborate with designers in a more streamlined
            and efficient manner.
          </p>

          <h2 className="font-semibold mt-4">Why It Matters</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <strong>Efficiency:</strong> Dev Mode simplifies the handoff
              process by reducing back-and-forth between design and development
              teams.
            </li>
            <li>
              <strong>Accuracy:</strong> Developers get accurate specs, assets,
              and code — directly from the design source.
            </li>
            <li>
              <strong>Integration:</strong> Works seamlessly with tools
              developers already use.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">Key Features</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              Interactive inspect panel with copy-paste code snippets in popular
              formats.
            </li>
            <li>
              Version control integration for design comparisons and history
              tracking.
            </li>
            <li>Customizable views to suit individual workflows.</li>
          </ul>

          <h2 className="font-semibold mt-4">Final Thoughts</h2>
          <p>
            If Figma’s aim was to make Dev Mode indispensable, they’ve likely
            succeeded. For teams that value speed, precision, and harmony
            between roles, this is a development worth watching.
          </p>
        </article>

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-6">Other articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <Card key={idx} className="overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs text-gray-500">{article.date}</p>
                  <p className="text-sm font-semibold leading-tight">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {article.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-xs text-blue-700 px-2 py-0.5 rounded-full border border-blue-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-blue-700 text-white text-center text-xs p-4">
        © Loopgum. 2025 Blog project. All rights reserved.
      </footer>
    </div>
  );
};
export default ArticleDetail;
