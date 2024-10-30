export class AdvBestStock {
  constructor(
    private readonly stock_code: string,
    private readonly stock_name: string,
    private readonly buy_datedeal: string,
    private readonly buy_price: number,
    private readonly sell_datedeal: string,
    private readonly sell_price: number,
    private readonly total_rate: string,
    private readonly pms_name: string
  ) {}

  getStockCode() {
    return this.stock_code
  }

  getStockName() {
    return this.stock_name
  }

  getBuyDatedeal() {
    return this.buy_datedeal
  }

  getBuyPrice() {
    return this.buy_price
  }

  getSellDatedeal() {
    return this.sell_datedeal
  }

  getSellPrice() {
    return this.sell_price
  }

  getTotalRate() {
    return this.total_rate
  }

  getPmsName() {
    return this.pms_name
  }
}
