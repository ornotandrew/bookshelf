import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import styles from './index.module.css'
import A from '@/components/A'
import GithubProject from '@/components/GithubProject'
import { currentlyReading } from '@/constants'
import Review from '@/components/Review'

const Home: NextPage = () => {
  return (
    <Layout>
      <header className={styles.Header}>
        <h1 className={styles.PageTitle}>My Bookshelf</h1>
        <p>
          I think bookshelves are great. They can reveal so much about the
          owner&apos;s tastes! Unfortunately, I tend to read eBooks and
          Audiobooks, so I can&apos;t share my favourite titles using
          physical space.
        </p>
        <p>
          Instead, I&apos;ve made this site. The data here was pulled from my{' '}
          <A href='https://www.goodreads.com/wraithy'>Goodreads</A> profile
          using <GithubProject user='wraithy' repo='goodreads-export' />.
        </p>
      </header>
      <section className={styles.CurrentlyReading}>
        <h2>Currently reading</h2>
        <div className={styles.ReviewContainer}>
          {currentlyReading.map((r) => (
            <Review key={r.book.url} review={r} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Home
