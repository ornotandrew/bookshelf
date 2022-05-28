import Review from '@/components/Review'
import { Review as ReviewType } from 'goodreads-export/lib/types'
import { TooltipProps } from 'recharts'

export const ReviewTooltip = ({ payload }: TooltipProps<any, any>) => {
  if (payload.length === 0) {
    return null
  }

  // Unfortunately Recharts doesn't make it easy for us to type this
  const review: ReviewType = payload[0].payload.review
  if (!review) {
    throw new Error("Expected a 'review' property on payload.payload")
  }

  return <Review review={review} variant='minimal' showPageCount transparent />
}

export default ReviewTooltip
