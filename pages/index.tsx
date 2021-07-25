import Link from 'next/link'
import Layout from 'components/Layout'
import BookHero from 'components/BookHero'
import BookTile from 'components/BookTile'
import { reviews } from '../constants'

export default function Home() {
  return (
    <Layout
      contentClass={
        'grid ' +
        // desktop
        'md:grid-cols-hero md:grid-rows-hero md:gap-y-8 md:gap-x-4 ' +
        // mobile
        'grid-cols-hero-mobile grid-rows-hero-mobile gap-y-4'
      }
    >
      <BookHero className='md:col-span-5 md:row-span-4 row-span-3' extract={reviews.currentlyReading[0]} />
      <BookTile
        grayscale
        className='md:col-span-2 md:row-span-1 col-span-1 row-span-2'
        book={reviews.finishedReading[0].book}
      />
      <BookTile
        grayscale
        className='md:col-span-2 md:row-span-1 col-span-1 row-span-2'
        book={reviews.finishedReading[1].book}
      />
      <Link href='/books'>
        <a className='card flex items-center justify-center text-typography-dim'>View more</a>
      </Link>
    </Layout>
  )
}
