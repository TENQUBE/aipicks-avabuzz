import { CoupangAdProduct } from '@/modules/ad/domain/CoupangAdData'

export class CoupangAdDataVM {
  readonly rCode: string
  readonly rMessage: string
  readonly data: CoupangAdProduct[]

  constructor(rCode: string, rMessage: string, data: CoupangAdProduct[]) {
    this.rCode = rCode
    this.rMessage = rMessage
    this.data = data
  }

  static of(rCode: string, rMessage: string, data: CoupangAdProduct[]) {
    return new CoupangAdDataVM(rCode, rMessage, data)
  }
}
