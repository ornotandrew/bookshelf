import styles from './index.module.css'
import Image from 'next/image'
import { FinishedExtract } from '@/constants'
import { DateTime } from 'luxon'

const humanDate = (d: string) => DateTime.fromISO(d).toFormat('LLL yyyy')

export const Review = ({ review }: { review: FinishedExtract }) => {
  return (
    <article className={styles.Container}>
      <div className={styles.ImageContainer}>
        <Image src={review.book.imageUrl} layout='fill' />
      </div>
      <div className={styles.Info}>
        <div className={styles.BookInfo}>
          <div>{review.book.title}</div>
          <div>{review.book.author.name}</div>
        </div>
        <div className={styles.ReadInfo}>{humanDate(review.timeline.finished)}</div>
      </div>
    </article>
  )
}

export default Review
