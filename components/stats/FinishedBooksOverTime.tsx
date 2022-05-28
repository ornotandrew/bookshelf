import ReviewTooltip from '@/components/stats/ReviewTooltip'
import { Finished } from '@/constants'
import { Review } from 'goodreads-export/lib/types'
import { DateTime } from 'luxon'
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const oneYearInMillis = 1000 * 60 * 60 * 24 * 365
const sixMonthsInMillis = oneYearInMillis / 2

export const FinishedBooksOverTime = ({
  reviews,
}: {
  reviews: Finished<Review>[]
}) => {
  const data = reviews.map((r) => ({
    date: new Date(r.timeline.finished).getTime(),
    pages: r.book.pageCount,
    review: r,
  }))

  const maxPages = Math.max(...data.map((d) => d.pages))

  return (
    <ResponsiveContainer>
      <ScatterChart margin={{ top: 50, right: 20, bottom: 20, left: 0 }}>
        <text
          x='50%'
          y={10}
          fill='black'
          textAnchor='middle'
          dominantBaseline='central'
        >
          <tspan fontSize='18'>Finished books</tspan>
        </text>
        <CartesianGrid strokeDasharray='5 5' opacity={0.75} />
        <XAxis
          dataKey='date'
          name='Date'
          tickCount={6}
          interval={0}
          type={'number'}
          domain={[
            `dataMin - ${sixMonthsInMillis}`,
            `dataMax + ${sixMonthsInMillis}`,
          ]}
          tickFormatter={(date) => DateTime.fromMillis(date).toFormat('yyyy')}
        />
        <YAxis
          dataKey='pages'
          name='Pages'
          label={{
            value: 'Pages',
            angle: -90,
            position: 'center',
          }}
          tickFormatter={(pages) => (pages < maxPages ? '' : pages)}
        />
        <Tooltip
          cursor={{ strokeDasharray: '5 5' }}
          content={<ReviewTooltip />}
        />
        <Scatter
          name='Finished books'
          data={data}
          fill='var(--color-primary)'
          fillOpacity={0.5}
          stroke='var(--color-primary)'
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default FinishedBooksOverTime
