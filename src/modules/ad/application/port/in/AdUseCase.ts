import { CoupangAdData } from '@/modules/ad/domain/CoupangAdData'

export interface AdUseCase {
  getCoupangAdData(imageSize: string): Promise<CoupangAdData>
}
