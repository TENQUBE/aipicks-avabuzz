import { Adv, Code } from '@/modules/stock/domain/BaseInfoData'

export class CodeVM {
  readonly stock_code: string
  readonly stock_name: string
  readonly curPrice: number
  readonly ratio: number
  readonly fluct_amt: number
  readonly latestDate: string

  constructor(
    stock_code: string,
    stock_name: string,
    curPrice: number,
    ratio: number,
    fluct_amt: number,
    latestDate: string
  ) {
    this.stock_code = stock_code
    this.stock_name = stock_name
    this.curPrice = curPrice
    this.ratio = ratio
    this.fluct_amt = fluct_amt
    this.latestDate = latestDate
  }

  static of(
    stock_code: string,
    stock_name: string,
    curPrice: number,
    ratio: number,
    fluct_amt: number,
    latestDate: string
  ) {
    return new CodeVM(stock_code, stock_name, curPrice, ratio, fluct_amt, latestDate)
  }
}

export class AdvVM {
  readonly buy_price: number
  readonly goal_price: number
  readonly cont1: string
  readonly cont2?: string
  readonly cont3?: string
  readonly cont4?: string

  constructor(
    buy_price: number,
    goal_price: number,
    cont1: string,
    cont2?: string,
    cont3?: string,
    cont4?: string
  ) {
    this.buy_price = buy_price
    this.goal_price = goal_price
    this.cont1 = cont1
    this.cont2 = cont2
    this.cont3 = cont3
    this.cont4 = cont4
  }

  static of(
    buy_price: number,
    goal_price: number,
    cont1: string,
    cont2?: string,
    cont3?: string,
    cont4?: string
  ) {
    return new AdvVM(buy_price, goal_price, cont1, cont2, cont3, cont4)
  }
}

export class BaseInfoDataVM {
  readonly code: CodeVM
  readonly adv: AdvVM

  constructor(code: Code, adv: Adv) {
    this.code = new CodeVM(
      code.stock_name,
      code.stock_name,
      code.curPrice,
      code.ratio,
      code.fluct_amt,
      code.latestDate
    )
    this.adv = new AdvVM(adv.buy_price, adv.goal_price, adv.cont1, adv.cont2, adv.cont3, adv.cont4)
  }

  static of(code: Code, adv: Adv) {
    return new BaseInfoDataVM(code, adv)
  }
}
