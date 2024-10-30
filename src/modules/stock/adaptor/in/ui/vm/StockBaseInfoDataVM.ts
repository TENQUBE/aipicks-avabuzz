import { Code, Adv } from '@/modules/stock/domain/StockBaseInfo'

export class StockBaseInfoDataVM {
  readonly code: Code
  readonly adv: Adv

  constructor(code: Code, adv: Adv) {
    this.code = code
    this.adv = adv
  }

  static of(code: Code, adv: Adv) {
    return new StockBaseInfoDataVM(code, adv)
  }
}
