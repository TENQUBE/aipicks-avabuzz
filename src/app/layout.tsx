import { GoogleAnalytics } from '@next/third-parties/google'
import localFont from 'next/font/local'
import 'swiper/css'

import { GA_ID } from './shared/config'
import GoogleAdScript from '@/app/shared/components/GoogleAdScript'
import AdpopcornAdScript from './shared/components/AdpopcornAdScript'
import '@/app/global.css'

const pretandard = localFont({
  src: [
    {
      path: '../../public/fonts/pretandard/Pretendard-Bold.woff',
      weight: '700'
    },
    {
      path: '../../public/fonts/pretandard/Pretendard-SemiBold.woff',
      weight: '600'
    },
    {
      path: '../../public/fonts/pretandard/Pretendard-Medium.woff',
      weight: '500'
    },
    {
      path: '../../public/fonts/pretandard/Pretendard-Regular.woff',
      weight: '400'
    }
  ],
  variable: '--font-Pretendard'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${pretandard.className} ${pretandard.variable}`} lang="ko">
      <head>
        <script
          type="text/javascript"
          src={
            process.env.NODE_ENV === 'development'
              ? 'https://s.avatye.com/rc/test/tenqube/rclib_timer.min.js'
              : 'https://s.avatye.com/rc/tenqube/rclib_timer.min.js'
          }
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={
            process.env.NODE_ENV === 'development'
              ? 'https://s.avatye.com/rc/test/tenqube/rclib_timer.min.css'
              : 'https://s.avatye.com/rc/tenqube/rclib_timer.min.css'
          }
        />
      </head>
      <body>
        <main>
          <GoogleAnalytics gaId={GA_ID} />
          <GoogleAdScript />
          <AdpopcornAdScript />
          {children}
        </main>
      </body>
    </html>
  )
}
