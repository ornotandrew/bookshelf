import rawReviews from './reviews.json'
import type { Extract, ReviewTimeline } from 'goodreads-export/lib/types'

export type FinishedExtract = Extract & {
  timeline: ReviewTimeline & {
    started: string
    finished: string
  }
}

const reviews = rawReviews as Extract[]

export { reviews }
