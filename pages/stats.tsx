import A from '@/components/A'
import GithubProject from '@/components/GithubProject'
import Layout from '@/components/Layout'
import { Nav } from '@/components/Nav'
import { NextPage } from 'next'
import styles from './stats.module.css'
import { readReviews } from '@/constants'
import FinishedBooksOverTime from '@/components/stats/FinishedBooksOverTime'

const Stats: NextPage = () => {
  return (
    <Layout>
      <header className={styles.Header}>
        <Nav />
        <h1 className={styles.PageTitle}>Stats</h1>
        <p>
          This data was pulled from my{' '}
          <A href='https://www.goodreads.com/wraithy'>Goodreads</A> profile
          using <GithubProject user='wraithy' repo='goodreads-export' />.
        </p>
      </header>
      <section className={styles.FinishedBooksOverTime}>
        <FinishedBooksOverTime reviews={readReviews} />
      </section>
    </Layout>
  )
}

export default Stats
