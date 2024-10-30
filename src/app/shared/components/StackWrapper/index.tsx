import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { Suspense } from 'react'

import Stack from '@/app/shared/libs/stackflow'
import isSafari from '@/app/shared/utils/isSafari'

interface StackWrapperProps {
  path: string
  searchParams: { [key: string]: string }
}

export default async function StackWrapper({ path, searchParams }: StackWrapperProps) {
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
