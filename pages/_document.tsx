import { Html, Head, Main, NextScript } from 'next/document'

const fonts = [
  'EBGaramond-VariableFont_wght.ttf',
  'EBGaramond-Italic-VariableFont_wght.ttf',
  'Inter-VariableFont_slnt,wght.ttf',
]

export default function Document() {
  return (
    <Html>
      <Head>
        {fonts.map((name) => (
          <link
            key={name}
            rel='preload'
            href={`/bookshelf/fonts/${name}`}
            as='font'
            type='font/ttf'
            crossOrigin='anonymous'
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
