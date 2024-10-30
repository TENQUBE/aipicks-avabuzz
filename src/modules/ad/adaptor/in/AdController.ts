import { AdUseCase } from '@/modules/ad/application/port/in/AdUseCase'
import { CoupangAdDataVM } from '@/modules/ad/adaptor/in/vm/CoupangAdDataVM'

export class AdController {
  constructor(private readonly adUseCase: AdUseCase) {}

  async getCoupangAdData(imageSize: string): Promise<CoupangAdDataVM> {
    const result = await this.adUseCase.getCoupangAdData(imageSize)

    return CoupangAdDataVM.of(result.getRCode(), result.getRMessage(), result.getData())
  }
}
