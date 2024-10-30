import { AdUseCase } from '@/modules/ad/application/port/in/AdUseCase'
import { CoupangAdData } from '@/modules/ad/domain/CoupangAdData'
import { AdOutPutPort } from '@/modules/ad/application/port/out/AdOutputPort'

export class AdService implements AdUseCase {
  constructor(private readonly outputPort: AdOutPutPort) {}

  getCoupangAdData(imageSize: string): Promise<CoupangAdData> {
    return this.outputPort.getCoupangAdData(imageSize)
  }
}
