import { Finished, readReviews } from "@/constants";
import Image from "next/image";
import GoodreadsLink from "@/components/GoodreadsLink";
import { Review } from "goodreads-export/lib/types";

export async function generateStaticParams() {
  return readReviews.map((review) => ({
    id: review.reviewId.toString(),
  }));
}

function Cover({
  review,
  className = "",
}: {
  review: Finished<Review>;
  className?: string;
}) {
  return (
    <div className={`mb-6 ${className}`}>
      {review.book.imageUrl && (
        <div className="relative w-full max-w-xs mx-auto md:ml-auto">
          <Image
            height={500}
            width={300}
            src={review.book.imageUrl}
            alt={`Cover of ${review.book.title}`}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

function Author({
  review,
  className,
}: {
  review: Finished<Review>;
  className?: string;
}) {
  return (
    <div className={`border-1 border-gray-400 p-4 rounded-lg ${className}`}>
      <h2 className="text-lg font-semibold mb-2">About the Author</h2>
      <p className="font-medium">{review.book.author.name}</p>

      {review.book.author.birthDate && (
        <p className="text-sm text-gray-500 mb-2">
          {review.book.author.birthDate}
          {review.book.author.deathDate && ` - ${review.book.author.deathDate}`}
        </p>
      )}

      <GoodreadsLink
        href={review.book.author.url}
        alt={"View author on Goodreads"}
        className="mb-2"
      />

      {review.book.author.genres && review.book.author.genres.length > 0 && (
        <div>
          <p className="text-sm text-gray-500">Known for</p>
          <p>{review.book.author.genres.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default async function Book({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = readReviews.find((r) => r.reviewId === Number(id))!;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content Area */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">
            {review.book.title}
            <span className="font-thin text-gray-400">{" by "}</span>
            {review.book.author.name}
          </h1>

          {review.book.series && (
            <p className="text-xl text-gray-400 mb-4">
              {review.book.series.name}{" "}
              {review.book.positionInSeries &&
                `(Book ${review.book.positionInSeries})`}
            </p>
          )}

          <GoodreadsLink
            href={review.book.url}
            alt={"View book on Goodreads"}
            className="mb-4"
          />

          {/* Book Cover and Author (smaller screens only) */}
          <div className="md:hidden flex-col gap-4 mb-6">
            <Cover review={review} className="min-w-[320px]" />
            <Author review={review} className="w-full" />
          </div>

          {/* Reading Timeline */}
          <div className="min-w-[320px] p-4 rounded-lg mb-6 border-1 border-gray-400">
            <h2 className="text-lg font-semibold mb-2">Reading Timeline</h2>
            <div className="grid grid-cols-3 gap-4">
              {review.timeline.shelved && (
                <div>
                  <p className="text-sm text-gray-500">Shelved</p>
                  <p>{review.timeline.shelved}</p>
                </div>
              )}
              {review.timeline.started && (
                <div>
                  <p className="text-sm text-gray-500">Started</p>
                  <p>{review.timeline.started}</p>
                </div>
              )}
              {review.timeline.finished && (
                <div>
                  <p className="text-sm text-gray-500">Finished</p>
                  <p>{review.timeline.finished}</p>
                </div>
              )}
            </div>
          </div>

          {/* Genres */}
          <div className="min-w-[320px] mb-6">
            <h2 className="text-lg font-semibold mb-2">Genres</h2>
            <span className={`inline-block text-gray-400`}>
              {review.book.genres.join(", ")}
            </span>
          </div>
          <hr className="mb-6 border-1 border-gray-400" />

          {/* Book Description */}
          <div className="mb-6">
            <p className="text-gray-300 whitespace-pre-line">
              {review.book.description}
            </p>
          </div>
        </div>

        {/* Sidebar - Book Cover and Author (larger screens only) */}
        <div className="hidden md:w-1/3 md:block">
          <Cover review={review} />
          <Author review={review} />
        </div>
      </div>
    </div>
  );
}
