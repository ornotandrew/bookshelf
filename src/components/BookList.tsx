"use client";

import { BookCover } from "@/components/BookCover";
import { readReviews } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

interface BookListProps {
  className?: string;
}

type GroupBy = "none" | "author" | "series";

export default function BookList({ className = "" }: BookListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState<GroupBy>("none");

  const filteredReviews = useMemo(() => {
    if (!searchQuery.trim()) return readReviews;

    const query = searchQuery.toLowerCase().trim();
    return readReviews.filter((review) => {
      const bookTitle = review.book.title.toLowerCase();
      const authorName = review.book.author.name.toLowerCase();
      const genres = review.book.genres.map(g => g.toLowerCase());
      const seriesName = review.book.series?.name?.toLowerCase() || "";

      return (
        bookTitle.includes(query) ||
        authorName.includes(query) ||
        seriesName.includes(query) ||
        genres.some(genre => genre.includes(query))
      );
    });
  }, [searchQuery]);

  const groupedReviews = useMemo(() => {
    if (groupBy === "none") return filteredReviews;

    if (groupBy === "author") {
      const groups = new Map<string, typeof filteredReviews>();
      filteredReviews.forEach(review => {
        const author = review.book.author.name;
        if (!groups.has(author)) {
          groups.set(author, []);
        }
        groups.get(author)?.push(review);
      });
      // Sort groups alphabetically by author name
      return Array.from(groups.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([author, reviews]) => [
          author,
          // Sort reviews alphabetically by book title
          reviews.sort((a, b) => a.book.title.localeCompare(b.book.title))
        ]);
    }

    if (groupBy === "series") {
      const groups = new Map<string, typeof filteredReviews>();
      filteredReviews.forEach(review => {
        const series = review.book.series?.name || "Standalone";
        if (!groups.has(series)) {
          groups.set(series, []);
        }
        groups.get(series)?.push(review);
      });
      // Sort groups alphabetically by series name
      return Array.from(groups.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([series, reviews]) => [
          series,
          // Sort reviews alphabetically by book title
          reviews.sort((a, b) => a.book.title.localeCompare(b.book.title))
        ]);
    }

    return filteredReviews;
  }, [filteredReviews, groupBy]);

  return (
    <div className="w-full space-y-4 pt-6">
      <div className="w-full max-w-sm mx-auto space-y-4">
        <div className="mx-4">
          <Input
            type="search"
            placeholder="Search by book, author, series, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-1 border-gray-500"
          />
        </div>
        <div className="flex justify-center gap-2">
          <Button
            variant={groupBy === "none" ? "default" : "outline"}
            onClick={() => setGroupBy("none")}
          >
            All
          </Button>
          <Button
            variant={groupBy === "author" ? "default" : "outline"}
            onClick={() => setGroupBy("author")}
          >
            By Author
          </Button>
          <Button
            variant={groupBy === "series" ? "default" : "outline"}
            onClick={() => setGroupBy("series")}
          >
            By Series
          </Button>
        </div>
      </div>
      <div className={`w-full flex flex-wrap justify-center p-4 gap-4 z-0 ${className}`}>
        {groupBy === "none" ? (
          filteredReviews.map((review, index) => (
            <BookCover key={index} review={review} />
          ))
        ) : (
          (groupedReviews as [string, typeof filteredReviews][]).map(([group, reviews]) => (
            <div key={group} className="w-full space-y-4 mb-12">
              <h2 className="text-xl font-semibold px-4 mb-6">{group}</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {reviews.map((review, index) => (
                  <BookCover key={index} review={review} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}