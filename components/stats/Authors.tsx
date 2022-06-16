import { Finished } from '@/constants'
import { Review } from 'goodreads-export/lib/types'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const topAuthorCount = 10

export const Authors = ({ reviews }: { reviews: Finished<Review>[] }) => {
  const counts = reviews.reduce((acc, cur) => {
    const authorName = cur.book.author.name
    if (!(authorName in acc)) {
      acc[authorName] = 0
    }
    acc[authorName] += 1
    return acc
  }, {} as { [name: string]: number })

  const data = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topAuthorCount)

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        layout='vertical'
        margin={{ top: 60, right: 50 }}
        barCategoryGap={2}
      >
        <text
          x='50%'
          y={10}
          fill='black'
          textAnchor='middle'
          dominantBaseline='central'
          fontFamily='Inter, Helvetica Neue, sans-serif'
        >
          <tspan fontSize='18'>Top {topAuthorCount} authors</tspan>
          <tspan
            fontSize='14'
            x='50%'
            dy='22px'
            fill='var(--color-text-lighten-2)'
          >
            by books read
          </tspan>
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

export default Authors
