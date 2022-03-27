import type { NextPage } from 'next'
import Select from 'react-select'
import styles from './books.module.css'
import { FinishedExtract, reviews } from '@/constants'
import Review from '@/components/review'
import { useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import selectWithIcon from '@/components/selectWithIcon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faArrowDownShortWide, faArrowDownWideShort, faUser } from '@fortawesome/free-solid-svg-icons'

type Order = 'read' | '-read' | 'author'

const orderLabels: Record<Order, string> = {
  '-read': 'Newest first',
  read: 'Oldest first',
  author: 'Author name',
}

const selectComponents = selectWithIcon({
  '-read': faArrowDownWideShort,
  read: faArrowDownShortWide,
  author: faUser,
} as Record<Order, IconProp>)

const Books: NextPage = () => {
  const [order, setOrder] = useState<Order>('read')

  const orderedReviews = useMemo(() => {
    const read = [...reviews].filter((r) => r.timeline.finished !== null) as FinishedExtract[]
    read.sort((a, b) => {
      switch (order) {
        case '-read':
          return DateTime.fromISO(a.timeline.finished) < DateTime.fromISO(b.timeline.finished) ? 1 : -1
        case 'read':
          return DateTime.fromISO(a.timeline.finished) < DateTime.fromISO(b.timeline.finished) ? -1 : 1
        case 'author':
          return a.book.author.name < b.book.author.name ? -1 : 1
      }
    })
    return read
  }, [order])

  return (
    <div className={styles.Container}>
      <header>
        <h1>All books</h1>
        <Select
          onChange={(newValue) => {
            newValue?.value && setOrder(newValue.value)
          }}
          components={selectComponents}
          value={{ value: order, label: orderLabels[order] }}
          options={Object.entries(orderLabels).map(([value, label]) => ({ value: value as Order, label }))}
        />
      </header>
      <section className={styles.ReviewContainer}>
        {orderedReviews.map((r) => (
          <Review key={r.reviewId} review={r} />
        ))}
      </section>
    </div>
  )
}

export default Books
