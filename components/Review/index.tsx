import styles from './index.module.css'
import type { Review as ReviewType } from 'goodreads-export/lib/types'
import { DateTime } from 'luxon'
import A from '@/components/A'
import { Started } from '@/constants'

const humanDate = (d: string) => DateTime.fromISO(d).toFormat('LLL yyyy')

const Progress = ({ review }: { review: Started<ReviewType> }) => {
  const started = review.timeline.started
  const { percent, date } = review.timeline.progress.at(-1) ?? {
    percent: 0,
    date: started,
  }
  const hoverText = `${percent}%
Started ${humanDate(started)}
Updated ${humanDate(date)}`
  return (
    <section title={hoverText}>
      <div className={styles.ProgressBarOuter}>
        <div
          style={{ width: `${Math.max(percent, 5)}%` }}
          className={styles.ProgressBarInner}
        ></div>
      </div>
    </section>
  )
}

const Cover = ({ review }: { review: ReviewType }) => {
  return (
    <div className={styles.ImageContainer}>
      <A href={review.book.url}>
        <img
          src={review.book.imageUrl}
          alt={review.book.title}
          className={styles.Cover}
        />
      </A>
    </div>
  )
}

const Info = ({
  review,
  showPageCount,
}: {
  review: ReviewType
  showPageCount: boolean
}) => {
  return (
    <section className={styles.Info}>
      <div>
        <div className={styles.BookTitle}>{review.book.title}</div>
        <div className={styles.AuthorName}>{review.book.author.name}</div>
      </div>
      {review.timeline.finished ? (
        <div className={styles.InfoFooter}>
          {showPageCount ? (
            <div className={styles.PageCount}>{review.book.pageCount} pg</div>
          ) : (
            <div />
          )}
          <div className={styles.FinishedDate}>
            {humanDate(review.timeline.finished)}
          </div>
        </div>
      ) : (
        <Progress review={review} />
      )}
    </section>
  )
}

export const Review = ({
  review,
  variant = 'dual',
  showPageCount = false,
  transparent = false,
}: {
  review: Started<ReviewType>
  variant?: 'dual' | 'minimal'
  showPageCount?: boolean
  transparent?: boolean
}) => {
  return (
    <article
      className={[
        styles.Container,
        variant === 'dual' ? styles.DualVariant : styles.MinimalVariant,
        transparent ? styles.TransparentContainer : ''
      ].join(' ')}
    >
      {variant === 'dual' && <Cover review={review} />}
      <Info review={review} showPageCount={showPageCount} />
    </article>
  )
}

export default Review
