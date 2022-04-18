import styles from './index.module.css'
import Image from 'next/image'
import type { Extract } from 'goodreads-export/lib/types'
import { Finished } from '@/constants'
import { DateTime } from 'luxon'
import A from '@/components/A'

const humanDate = (d: string) => DateTime.fromISO(d).toFormat('LLL yyyy')

export const Review = ({ review }: { review: Finished<Extract> }) => {
  return (
    <article className={styles.Container}>
      <div className={styles.ImageContainer}>
        <A href={review.book.url}>
          <Image src={review.book.imageUrl} alt={review.book.title} layout='fill' />
        </A>
      </div>
      <div className={styles.Info}>
        <div>
          <div className={styles.BookTitle}>{review.book.title}</div>
          <div className={styles.AuthorName}>{review.book.author.name}</div>
        </div>
        <div className={styles.ReadInfo}>{humanDate(review.timeline.finished)}</div>
      </div>
    </article>
  )
}

export default Review
