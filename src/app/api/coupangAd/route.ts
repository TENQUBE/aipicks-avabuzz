export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import moment from 'moment'
import crypto from 'crypto'

import { ACCESS_KEY, GOLDBOX_URL, SECRET_KEY } from '@/app/shared/config'

const generateHmac = (url: string, method: string, secretKey: string, accessKey: string) => {
  const parts = url.split(/\?/)
  const [path, query = ''] = parts

  const datetime = moment.utc().format('YYMMDD[T]HHmmss[Z]')
  const message = datetime + method + path + query

  const signature = crypto.createHmac('sha256', secretKey).update(message).digest('hex')

  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`
}

export async function GET(req: NextRequest) {
  try {
    const subId = req.nextUrl.searchParams.get('subId')
    const deviceId = req.nextUrl.searchParams.get('deviceId')
    const imageSize = req.nextUrl.searchParams.get('imageSize')

    const domain = 'https://api-gateway.coupang.com'
    const path = `/v2/providers/affiliate_open_api/apis/openapi/v1/products/reco`
    const queryString = `deviceId=${deviceId}&subId=${subId}&imageSize=${imageSize}`

    const authorization = generateHmac(`${path}?${queryString}`, 'GET', SECRET_KEY!, ACCESS_KEY!)

    const res = await fetch(`${domain}${path}?${queryString}`, {
      method: 'GET',
      headers: { Authorization: authorization }
    })

    const result = await res.json()

    if (!result.data) throw new Error('Internal Server Error')

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({
      error,
      rCode: '',
      rMessage: '',
      data: [
        {
          categoryName: '',
          isFreeShipping: false,
          isRocket: false,
          productId: 0,
          productImage: '/images/ad/coupang-goldbox.png',
          productName: '매일 오전 7시, 골드박스 1일특가!',
          productPrice: 0,
          productUrl: GOLDBOX_URL
        }
      ]
    })
  }
}
