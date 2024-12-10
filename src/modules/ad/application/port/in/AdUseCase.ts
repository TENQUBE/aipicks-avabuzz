import { Coupang } from '@/modules/ad/domain/Coupang'

export interface AdUseCase {
  getCoupang(deviceId: string, imageSize: string): Promise<Coupang>
}
