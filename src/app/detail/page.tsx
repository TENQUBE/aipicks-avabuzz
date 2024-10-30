export const dynamic = 'force-dynamic'

import StackWrapper from '@/app/shared/components/StackWrapper'

interface PageProps {
  searchParams: { [key: string]: string }
}

export default function Page({ searchParams }: PageProps) {
  return <StackWrapper path="detail" searchParams={searchParams} />
}
