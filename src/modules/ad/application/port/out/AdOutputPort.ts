import { Coupang } from '@/modules/ad/domain/Coupang'

export interface AdOutPutPort {
  getCoupang(deviceId: string, imageSize: string): Promise<Coupang>
}
