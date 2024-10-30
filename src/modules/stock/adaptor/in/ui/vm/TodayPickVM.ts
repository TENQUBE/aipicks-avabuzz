export class TodayPickVM {
  readonly stock_code: string
  readonly stock_name: string
  readonly pms_code: string
  readonly sector: string

  constructor(stock_code: string, stock_name: string, pms_code: string, sector: string) {
    this.stock_code = stock_code
    this.stock_name = stock_name
    this.pms_code = pms_code
    this.sector = sector
  }

  static of(stock_code: string, stock_name: string, pms_code: string, sector: string) {
    return new TodayPickVM(stock_code, stock_name, pms_code, sector)
  }
}
