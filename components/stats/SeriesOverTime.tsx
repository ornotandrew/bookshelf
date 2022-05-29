import { colorPallette, Finished } from '@/constants'
import { Review } from 'goodreads-export/lib/types'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, XAxis } from 'recharts'

const oneYearInMillis = 1000 * 60 * 60 * 24 * 365
const groupByPeriod = oneYearInMillis / 2

export const SeriesOverTime = ({
  reviews,
}: {
  reviews: Finished<Review>[]
}) => {
  const reviewsWithSeries = reviews.filter((r) => !!r.book.series)
  const colorBySeriesName = [
    ...new Set(reviewsWithSeries.map((r) => r.book.series.name)),
  ].reduce((acc, name, i) => {
    return {
      ...acc,
      [name]: colorPallette[i % colorPallette.length],
    }
  }, {} as { [name: string]: string })

  // count(seriesUrl) group by seriesUrl, period
  const countByPeriodAndSeries = reviewsWithSeries.reduce(
    (acc, r) => {
      const millis = new Date(r.timeline.finished).getTime()
      const period = millis - (millis % groupByPeriod)

      if (!acc.has(period)) {
        acc.set(
          period,
          Object.fromEntries(
            Object.keys(colorBySeriesName).map((name) => [name, 0])
          )
        )
      }
      acc.get(period)[r.book.series.name] += r.book.pageCount

      return acc
    },
    new Map() as Map<
      number,
      {
        [name: string]: number
      }
    >
  )

  // Add one more period at the beginning to root everything at zero
  const minPeriod = Math.min(...countByPeriodAndSeries.keys())
  countByPeriodAndSeries.set(
    minPeriod - groupByPeriod,
    Object.fromEntries(Object.keys(colorBySeriesName).map((name) => [name, 0]))
  )

  const data = Array.from(
    countByPeriodAndSeries.entries(),
    ([period, counts]) => ({
      __period: Number(period),
      ...counts,
    })
  )

  const [activeSeriesName, setActiveSeriesName] = useState(null)

  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: -50, left: 35, right: 35 }}>
        <text
          x='50%'
          y={80}
          fill={'var(--color-text-primary)'}
          textAnchor='middle'
          dominantBaseline='central'
        >
          <tspan fontSize='18' fontFamily='Inter, Helvetica Neue, sans-serif'>
            Series
          </tspan>
        </text>
        <text
          x='50%'
          y={105}
          fill='var(--color-text-primary)'
          textAnchor='middle'
          dominantBaseline='central'
        >
          {activeSeriesName ? (
            <tspan fontSize='14'>{activeSeriesName}</tspan>
          ) : (
            <tspan fontSize='14' fill='var(--color-text-lighten-2)'>
              {'( Select an area )'}
            </tspan>
          )}
        </text>
        <XAxis
          dataKey='__period'
          name='Date'
          interval='preserveStartEnd'
          ticks={Array.from(countByPeriodAndSeries.keys())}
          type={'number'}
          domain={['dataMin', 'dataMax']}
          tickFormatter={(date) => DateTime.fromMillis(date).toFormat('yyyy')}
        />
        {Object.entries(colorBySeriesName).map(([name, color]) => {
          let fill = color
          let stroke = '#888'
          if (activeSeriesName) {
            fill = activeSeriesName === name ? color : '#fff'
            stroke = activeSeriesName === name ? 'black' : stroke
          }

          return (
            <Area
              key={name}
              type='basis'
              dataKey={name}
              stackId='1'
              fill={fill}
              stroke={stroke}
              onMouseEnter={() => setActiveSeriesName(name)}
              onMouseLeave={() => setActiveSeriesName(null)}
            />
          )
        })}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SeriesOverTime
