export interface CoupangData {
  categoryName: string
  isFreeShipping?: boolean
  isRocket: boolean
  productId: number
  productImage: string
  productName: string
  productPrice: number
  productUrl: string
}

export class Coupang {
  constructor(
    private readonly rCode: string,
    private readonly rMessage: string,
    private readonly data: CoupangData[]
  ) {}

  getRCode() {
    return this.rCode
  }

  getRMessage() {
    return this.rMessage
  }

  getData() {
    return this.data
  }
}
