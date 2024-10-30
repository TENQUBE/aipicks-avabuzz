import { Coupang } from '@/modules/ad/domain/Coupang'

export interface AdUseCase {
  getCoupang(imageSize: string): Promise<Coupang>
}
