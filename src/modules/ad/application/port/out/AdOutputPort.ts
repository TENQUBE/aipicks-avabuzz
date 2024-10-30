import { Coupang } from '@/modules/ad/domain/Coupang'

export interface AdOutPutPort {
  getCoupang(imageSize: string): Promise<Coupang>
}
