import rawReviews from './reviews.json'
import type { Extract, ReviewTimeline, Series } from 'goodreads-export/lib/types'

export type Finished<T extends Extract> = T & {
  timeline: ReviewTimeline & {
    started: string
    finished: string
  }
}

export type WithSeries<T extends Extract> = T & {
  book: {
    series: Series
  }
}

export const reviews = rawReviews as Extract[]

export const readReviews = reviews.filter((r) => r.timeline.finished !== null)
