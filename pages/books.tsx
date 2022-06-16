import type { NextPage } from 'next'
import Select from 'react-select'
import styles from './books.module.css'
import { Finished, WithSeries, readReviews } from '@/constants'
import Review from '@/components/Review'
import { useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import type {
  Author,
  Series,
  Review as ReviewType,
} from 'goodreads-export/lib/types'
import A from '@/components/A'
import GithubProject from '@/components/GithubProject'
import Layout from '@/components/Layout'

const authorsByUrl = readReviews.reduce<Record<string, Author>>(
  (acc, review) =>
    review.book.author.url in acc
      ? acc
      : { ...acc, [review.book.author.url]: review.book.author },
  {}
)

const seriesByUrl = readReviews.reduce<Record<string, Series>>(
  (acc, review) => {
    if (!review.book.series) {
      return acc
    }
    return review.book.series.url in acc
      ? acc
      : { ...acc, [review.book.series.url]: review.book.series }
  },
  {}
)

const Books: NextPage = () => {
  const [authorUrl, setAuthorUrl] = useState<string | null>(null)
  const [seriesUrl, setSeriesUrl] = useState<string | null>(null)

  const authors = useMemo<Author[]>(() => {
    const filteredIndex = seriesUrl
      ? readReviews.reduce((acc, review) => {
          if (
            !review.book.series ||
            review.book.author.url in acc ||
            review.book.series.url !== seriesUrl
          ) {
            return acc
          }
          return {
            ...acc,
            [review.book.author.url]: review.book.author,
          }
        }, {} as Record<string, Author>)
      : authorsByUrl

    return Object.values(filteredIndex).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }, [seriesUrl])

  const series = useMemo<Series[]>(() => {
    const filteredIndex = authorUrl
      ? readReviews.reduce((acc, review) => {
          if (
            !review.book.series ||
            review.book.series.url in acc ||
            review.book.author.url !== authorUrl
          ) {
            return acc
          }
          return {
            ...acc,
            [review.book.series.url]: review.book.series,
          }
        }, {} as Record<string, Series>)
      : seriesByUrl

    return Object.values(filteredIndex).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }, [authorUrl])

  const orderedReviews = useMemo(() => {
    const orderedReviews = [...readReviews]
      .filter(
        (r) =>
          !authorUrl ||
          (r as Finished<ReviewType>).book.author.url === authorUrl
      )
      .filter(
        (r) => !seriesUrl || r.book.series?.url === seriesUrl
      ) as WithSeries<Finished<ReviewType>>[]

    return orderedReviews.sort((a, b) =>
      DateTime.fromISO(a.timeline.finished) <
      DateTime.fromISO(b.timeline.finished)
        ? 1
        : -1
    )
  }, [authorUrl, seriesUrl])

  return (
    <Layout>
      <header>
        <h1>Books I&apos;ve read</h1>
        <p>
          This data was pulled from my{' '}
          <A href='https://www.goodreads.com/wraithy'>Goodreads</A> profile
          using <GithubProject user='wraithy' repo='goodreads-export' />.
        </p>
      </header>
      <div className={styles.Filters}>
        <Select
          placeholder='Author'
          isClearable={true}
          onChange={(newValue) => {
            setAuthorUrl(newValue?.value ?? null)
          }}
          value={
            authorUrl
              ? { value: authorUrl, label: authorsByUrl[authorUrl].name }
              : null
          }
          options={authors.map((author) => ({
            value: author.url,
            label: author.name,
          }))}
        />
        <Select
          placeholder='Series'
          isClearable={true}
          onChange={(newValue) => {
            setSeriesUrl(newValue?.value ?? null)
          }}
          value={
            seriesUrl
              ? { value: seriesUrl, label: seriesByUrl[seriesUrl].name }
              : null
          }
          options={Object.values(series).map((series) => ({
            value: series.url,
            label: series.name,
          }))}
        />
      </div>
      <section className={styles.ReviewContainer}>
        {orderedReviews.map((r) => (
          <Review key={r.reviewId} review={r} />
        ))}
      </section>
    </Layout>
  )
}

export default Books
