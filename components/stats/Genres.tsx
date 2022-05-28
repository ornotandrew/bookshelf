import { Finished } from '@/constants'
import { Review } from 'goodreads-export/lib/types'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const genresForOneBookCutoff = 5
const topGenreCount = 10

export const Genres = ({ reviews }: { reviews: Finished<Review>[] }) => {
  const counts = reviews
    .flatMap((r) => r.book.genreHierarchy.slice(0, genresForOneBookCutoff))
    .map((genrePath) => genrePath[0])
    .reduce((acc, cur) => {
      if (!(cur in acc)) {
        acc[cur] = 0
      }
      acc[cur] += 1
      return acc
    }, {} as { [name: string]: number })

  const data = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topGenreCount)

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        layout='vertical'
        margin={{ top: 50, right: 50 }}
        barCategoryGap={2}
      >
        <text
          x='50%'
          y={10}
          fill='black'
          textAnchor='middle'
          dominantBaseline='central'
        >
          <tspan fontSize='18'>Top {topGenreCount} genres</tspan>
        </text>
        <YAxis dataKey='name' type='category' width={180} interval={0} />
        <XAxis dataKey='count' type='number' hide />
        <Bar
          dataKey='count'
          fill='var(--color-secondary)'
          fillOpacity={0.5}
          stroke='var(--color-secondary)'
          label={{ position: 'right', fill: 'var(--color-text-lighten-2)' }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Genres
