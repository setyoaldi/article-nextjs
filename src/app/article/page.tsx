"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { FC } from "react";

interface Article {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: 1,
    title: "Cybersecurity Essentials Every Developer Should Know",
    date: "April 3, 2025",
    excerpt:
      "Prepare your workstations with these fundamental cybersecurity practices for developers.",
    image: "/article1.jpg",
    tags: ["Security", "Tips"],
  },
  {
    id: 2,
    title: "The Future of Work: Remote-First Teams and Digital Tools",
    date: "April 3, 2025",
    excerpt:
      "Organizations are redefining remote collaboration with new tools and processes.",
    image: "/article2.jpg",
    tags: ["Remote Work", "Tools"],
  },
  {
    id: 3,
    title: "Design Systems: Why Your Team Needs One in 2025",
    date: "April 3, 2025",
    excerpt:
      "Design systems save time, ensure consistency, and speed up design efforts.",
    image: "/article3.jpg",
    tags: ["Design", "Systems"],
  },
  {
    id: 4,
    title: "Web3 and the Decentralized Internet: What You Need to Know",
    date: "April 3, 2025",
    excerpt:
      "Navigate the decentralized web and what it means for developers and users.",
    image: "/article4.jpg",
    tags: ["Web3", "Blockchain"],
  },
  {
    id: 5,
    title: "Debugging Like a Pro: Tools & Techniques for Faster Fixes",
    date: "April 3, 2025",
    excerpt:
      "Explore top tools to identify errors quickly, save hours, and boost reliability.",
    image: "/article5.jpg",
    tags: ["Debugging", "Productivity"],
  },
  {
    id: 6,
    title: "Accessibility in Design: More Than Just Compliance",
    date: "April 3, 2025",
    excerpt: "Design with empathy. Ensure your product is usable by everyone.",
    image: "/article6.jpg",
    tags: ["Accessibility", "UX"],
  },
  {
    id: 7,
    title: "Figma’s New Dev Mode: A Game-Changer for Designers & Developers",
    date: "April 3, 2025",
    excerpt: "Explore how Dev Mode bridges handoff with clarity and speed.",
    image: "/article7.jpg",
    tags: ["Design", "Prototyping"],
  },
  {
    id: 8,
    title: "How AI is Changing the Game in Front-End Development",
    date: "April 3, 2025",
    excerpt:
      "From code generation to accessibility reviews, AI is shaping frontend dev.",
    image: "/article8.jpg",
    tags: ["AI", "Frontend"],
  },
  {
    id: 9,
    title: "2025 Trends Dominating UI/UX",
    date: "April 3, 2025",
    excerpt:
      "What trends will dominate the design space in 2025? Here’s our shortlist.",
    image: "/article9.jpg",
    tags: ["Trends", "Design"],
  },
];

const ArticlesPage: FC = () => {
  return (
    <div className="w-full">
      <section className="relative text-white py-16 px-4 md:px-12">
        <div className="absolute inset-0">
          <Image
            src="/youngmale.jpg"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="z-0"
          />
          <div className="absolute inset-0 bg-blue-600 opacity-70 z-10" />
        </div>
        <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">
          <Image
            src="/logoipsum-putih.png"
            alt="Logo"
            width={120}
            height={40}
          />
          <div className="flex items-center gap-2">
            <Image
              src="/avatar.jpg"
              alt="User avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-sm font-medium">James Dean</span>
          </div>
        </div>
        <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
          <p className="text-sm md:text-base">Blog genzet</p>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mt-2">
            The Journal : Design Resources, Interviews, and Industry News
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Your daily dose of design insights!
          </p>

          {/* Search / Filter Controls */}
          <div className="mt-6 flex flex-col md:flex-row gap-2 items-center justify-center">
            <select className="px-4 py-2 rounded-md border-2 border-white text-white w-full md:w-auto">
              <option>Select category</option>
            </select>
            <div className="relative w-full md:w-1/2">
              <Input
                placeholder="Search articles..."
                className="pl-10 rounded-md text-white placeholder-white 
               border-2 border-white"
              />
              <Search className="absolute left-3 top-2.5 text-white h-5 w-5 border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 md:px-12 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">
            Showing: 20 of 342 articles
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {article.date}
                  </p>
                  <h3 className="text-base font-semibold mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-10">
        <Image
          src="/logoipsum-putih.png"
          alt="Logo"
          width={120}
          height={40}
          className="mx-auto mb-2"
        />
        <p className="text-xs">© 2025 Logoplsum. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ArticlesPage;
