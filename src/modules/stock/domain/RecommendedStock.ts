export class RecommendedStock {
  constructor(
    private readonly stock_code: string,
    private readonly stock_name: string,
    private readonly pms_code: string,
    private readonly sector: string
  ) {}

  getStockCode() {
    return this.stock_code
  }

  getStockName() {
    return this.stock_name
  }

  getPmsCode() {
    return this.pms_code
  }

  getSector() {
    return this.sector
  }
}
