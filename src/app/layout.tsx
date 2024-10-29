import localFont from 'next/font/local'

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
      <body>{children}</body>
    </html>
  )
}
