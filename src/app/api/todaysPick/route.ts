export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { API_URL } from '@/app/shared/config'

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/todaysPick`, {
      method: 'GET'
    })

    const result = await res.json()

    return NextResponse.json(result)
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Internal Server Error')
  }
}
