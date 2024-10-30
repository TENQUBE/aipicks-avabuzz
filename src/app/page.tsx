export const dynamic = 'force-dynamic'

import StackWrapper from '@/app/shared/components/StackWrapper'

interface PageProps {
  searchParams: { [key: string]: string }
}

export default async function Page({ searchParams }: PageProps) {
  return <StackWrapper path="" searchParams={searchParams} />
}
