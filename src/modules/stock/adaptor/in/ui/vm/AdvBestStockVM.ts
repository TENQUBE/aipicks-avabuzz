export class AdvBestStockVM {
  readonly stock_code: string
  readonly stock_name: string
  readonly buy_datedeal: string
  readonly buy_price: number
  readonly sell_datedeal: string
  readonly sell_price: number
  readonly total_rate: string
  readonly pms_name: string

  constructor(
    stock_code: string,
    stock_name: string,
    buy_datedeal: string,
    buy_price: number,
    sell_datedeal: string,
    sell_price: number,
    total_rate: string,
    pms_name: string
  ) {
    this.stock_code = stock_code
    this.stock_name = stock_name
    this.buy_datedeal = buy_datedeal
    this.buy_price = buy_price
    this.sell_datedeal = sell_datedeal
    this.sell_price = sell_price
    this.total_rate = total_rate
    this.pms_name = pms_name
  }

  static of(
    stock_code: string,
    stock_name: string,
    buy_datedeal: string,
    buy_price: number,
    sell_datedeal: string,
    sell_price: number,
    total_rate: string,
    pms_name: string
  ) {
    return new AdvBestStockVM(
      stock_code,
      stock_name,
      buy_datedeal,
      buy_price,
      sell_datedeal,
      sell_price,
      total_rate,
      pms_name
    )
  }

  getFormattedSellDateDeal() {
    const year = this.sell_datedeal.slice(0, 4)
    const month = this.sell_datedeal.slice(4, 6)
    const day = this.sell_datedeal.slice(6, 8)

    return `${year}.${month}.${day}`
  }
}
