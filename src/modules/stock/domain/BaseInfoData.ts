export interface Code {
  stock_code: string
  stock_name: string
  curPrice: number
  ratio: number
  fluct_amt: number
  latestDate: string
}

export interface Adv {
  buy_price: number
  goal_price: number
  cont1: string
  cont2?: string
  cont3?: string
  cont4?: string
}

export class BaseInfoData {
  constructor(private readonly code: Code, private readonly adv: Adv) {}

  getCode() {
    return this.code
  }

  getAdv() {
    return this.adv
  }
}
