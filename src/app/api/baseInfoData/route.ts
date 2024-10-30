export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/app/shared/config'

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code')
    const pms_code = req.nextUrl.searchParams.get('pms_code')

    const res = await fetch(`${API_URL}/baseInfoData?code=${code}&pms_code=${pms_code}`, {
      method: 'GET'
    })

    const result = await res.json()

    return NextResponse.json(result)
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Internal Server Error')
  }
}
