import Image from "next/image";
import { Review as ReviewType } from "goodreads-export/lib/types";
import { Started } from "@/constants";
import Link from "next/link";

export const BookCover = ({ review }: { review: Started<ReviewType> }) => {
  return (
    <Link href={`/book/${review.reviewId}`}>
      <div
        className={
          "w-[300px] h-[180px] min-w-[300px] min-h-[180px] p-[1px] rounded-[9px] bg-gray-600 transition duration-300 hover:shadow-neon-glow"
        }
      >
        <div className="relative overflow-hidden bg-black rounded-lg w-full h-full">
          {/* Background image aligned to the right */}
          <div className="ml-[90px] absolute inset-0 flex justify-end">
            <Image
              src={review.book.imageUrl}
              alt={`Cover of ${review.book.title}`}
              fill
              className="object-cover object-right"
              priority
            />
          </div>

          {/* Gradient overlay - fades from black on left to transparent on right */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black to-transparent from-30% to-90%"
            aria-hidden="true"
          />

          {/* Gradient overlay - fades from black on top and bottom to transparent in middle */}
          <div
            className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.5)0%,rgba(0,0,0,0)10%,rgba(0,0,0,0)90%,rgba(0,0,0,0.5)100%)]"
            aria-hidden="true"
          />

          {/* Content on the left side */}
          <div className="relative z-10 h-full flex flex-col justify-center p-4 max-w-[60%]">
            <h2
              className="text-xl font-bold text-white line-clamp-4 mb-2"
              aria-label={review.book.title}
            >
              {review.book.title}
            </h2>
            <p
              className="text-sm text-gray-200 overflow-hidden line-clamp-2"
              aria-label={review.book.title}
            >
              {review.book.author.name}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
