import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { Suspense } from 'react'

import Stack from '@/app/shared/libs/stackflow'
import isSafari from '@/app/shared/utils/isSafari'

interface StackContainerProps {
  path: string
  searchParams: Promise<{ [key: string]: string }>
}

export default async function StackContainer({ path, searchParams }: StackContainerProps) {
  const [headerList, searchParamsObj] = await Promise.all([headers(), searchParams])

  const noAnimate = isSafari(userAgent({ headers: headerList }).ua)

  const queryString = new URLSearchParams(searchParamsObj).toString()

  return (
    <Suspense>
      <Stack
        initialContext={{
          req: {
            path: `/${path}/?${queryString}`,
            noAnimate
          }
        }}
      />
    </Suspense>
  )
}
