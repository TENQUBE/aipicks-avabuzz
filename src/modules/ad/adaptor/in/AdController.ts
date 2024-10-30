import { AdUseCase } from '@/modules/ad/application/port/in/AdUseCase'
import { CoupangVM } from '@/modules/ad/adaptor/in/vm/CoupangVM'

export class AdController {
  constructor(private readonly adUseCase: AdUseCase) {}

  async getCoupangAdData(imageSize: string): Promise<CoupangVM> {
    const coupang = await this.adUseCase.getCoupang(imageSize)

    return CoupangVM.of(coupang.getRCode(), coupang.getRMessage(), coupang.getData())
  }
}
