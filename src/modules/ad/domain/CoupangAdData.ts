export interface CoupangAdProduct {
  categoryName: string
  isFreeShipping?: boolean
  isRocket: boolean
  productId: number
  productImage: string
  productName: string
  productPrice: number
  productUrl: string
}

export class CoupangAdData {
  constructor(
    private readonly rCode: string,
    private readonly rMessage: string,
    private readonly data: CoupangAdProduct[]
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
