import styles from './index.module.css'
import type { Extract } from 'goodreads-export/lib/types'
import { DateTime } from 'luxon'
import A from '@/components/A'
import { Started } from '@/constants'

const humanDate = (d: string) => DateTime.fromISO(d).toFormat('LLL yyyy')

const Progress = ({ review }: { review: Started<Extract> }) => {
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

export const Review = ({ review }: { review: Started<Extract> }) => {
  return (
    <article className={styles.Container}>
      <div className={styles.ImageContainer}>
        <A href={review.book.url}>
          <img
            src={review.book.imageUrl}
            alt={review.book.title}
            className={styles.Cover}
          />
        </A>
      </div>
      <section className={styles.Info}>
        <div>
          <div className={styles.BookTitle}>{review.book.title}</div>
          <div className={styles.AuthorName}>{review.book.author.name}</div>
        </div>
        {review.timeline.finished ? (
          <div className={styles.ReadInfo}>
            {humanDate(review.timeline.finished)}
          </div>
        ) : (
          <Progress review={review} />
        )}
      </section>
    </article>
  )
}

export default Review
