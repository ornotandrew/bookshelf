import A from '@/components/A'
import GithubProject from '@/components/GithubProject'
import Layout from '@/components/Layout'
import { NextPage } from 'next'
import styles from './stats.module.css'
import { readReviews } from '@/constants'
import FinishedBooksOverTime from '@/components/stats/FinishedBooksOverTime'
import Genres from '@/components/stats/Genres'
import SeriesOverTime from '@/components/stats/SeriesOverTime'
import Authors from '@/components/stats/Authors'

const Stats: NextPage = () => {
  return (
    <Layout>
      <header className={styles.Header}>
        <h1 className={styles.PageTitle}>Stats</h1>
        <p>
          This data was pulled from my{' '}
          <A href='https://www.goodreads.com/wraithy'>Goodreads</A> profile
          using <GithubProject user='wraithy' repo='goodreads-export' />.
        </p>
      </header>
      <section className={styles.SeriesOverTime}>
        <SeriesOverTime reviews={readReviews} />
      </section>
      <div className={styles.TopN}>
        <section className={styles.Genres}>
          <Genres reviews={readReviews} />
        </section>
        <section className={styles.Authors}>
          <Authors reviews={readReviews} />
        </section>
      </div>
      <section className={styles.FinishedBooksOverTime}>
        <FinishedBooksOverTime reviews={readReviews} />
      </section>
    </Layout>
  )
}

export default Stats
