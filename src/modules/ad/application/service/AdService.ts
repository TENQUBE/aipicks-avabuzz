import { AdUseCase } from '@/modules/ad/application/port/in/AdUseCase'
import { AdOutPutPort } from '@/modules/ad/application/port/out/AdOutputPort'
import { Coupang } from '@/modules/ad/domain/Coupang'

export class AdService implements AdUseCase {
  constructor(private readonly outputPort: AdOutPutPort) {}

  getCoupang(deviceId: string, imageSize: string): Promise<Coupang> {
    return this.outputPort.getCoupang(deviceId, imageSize)
  }
}
