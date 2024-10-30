import { CoupangAdData } from '@/modules/ad/domain/CoupangAdData'

export interface AdOutPutPort {
  getCoupangAdData(imageSize: string): Promise<CoupangAdData>
}
