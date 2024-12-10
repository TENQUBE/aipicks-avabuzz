export const dynamic = 'force-dynamic'

import StackContainer from '@/app/shared/components/StackContainer'

interface PageProps {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function Page({ searchParams }: PageProps) {
  return <StackContainer path="" searchParams={searchParams} />
}
