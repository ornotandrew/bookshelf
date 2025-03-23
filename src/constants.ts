import { Review, ReviewTimeline, Series } from "goodreads-export/lib/types";
import {
  reviewsFromExtract,
  mostRecentlyFinished,
} from "goodreads-export/lib/util/transform";
import extract from "../extract.json";

export type Started<T extends Review> = T & {
  timeline: ReviewTimeline & {
    started: string;
  };
};

export type Finished<T extends Review> = T & {
  timeline: ReviewTimeline & {
    started: string;
    finished: string;
  };
};

export type WithSeries<T extends Review> = T & {
  book: {
    series: Series;
  };
};

export const reviews = reviewsFromExtract(extract);

export const readReviews = reviews
  .filter((r): r is Finished<Review> => r.timeline.finished !== null)
  .sort(mostRecentlyFinished);

export const currentlyReading = reviews.filter(
  (r) => r.timeline.started && !r.timeline.finished,
) as Started<Review>[];

export const colorPallette = [
  "#268bd2",
  "#d27426",
  "#800080",
  "#FFFF99",
  "#9dd9d2",
  "#392f5a",
];
