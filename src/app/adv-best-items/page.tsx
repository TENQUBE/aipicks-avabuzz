export const dynamic = 'force-dynamic'

import StackWrapper from '@/app/shared/components/StackWrapper'

interface PageProps {
  searchParams: Promise<{ [key: string]: string }>
}

export default function Page({ searchParams }: PageProps) {
  return <StackWrapper path="adv-best-items" searchParams={searchParams} />
}
