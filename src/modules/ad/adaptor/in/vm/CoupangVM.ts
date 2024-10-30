import { CoupangData } from '@/modules/ad/domain/Coupang'

export class CoupangDataVM {
  readonly categoryName: string
  readonly isFreeShipping?: boolean
  readonly isRocket: boolean
  readonly productId: number
  readonly productImage: string
  readonly productName: string
  readonly productPrice: number
  readonly productUrl: string

  constructor(
    categoryName: string,
    isRocket: boolean,
    productId: number,
    productImage: string,
    productName: string,
    productPrice: number,
    productUrl: string,
    isFreeShipping?: boolean
  ) {
    this.categoryName = categoryName
    this.isRocket = isRocket
    this.productId = productId
    this.productImage = productImage
    this.productName = productName
    this.productPrice = productPrice
    this.productUrl = productUrl
    this.isFreeShipping = isFreeShipping
  }

  static of(
    categoryName: string,
    isRocket: boolean,
    productId: number,
    productImage: string,
    productName: string,
    productPrice: number,
    productUrl: string,
    isFreeShipping?: boolean
  ) {
    return new CoupangDataVM(
      categoryName,
      isRocket,
      productId,
      productImage,
      productName,
      productPrice,
      productUrl,
      isFreeShipping
    )
  }
}

export class CoupangVM {
  readonly rCode: string
  readonly rMessage: string
  readonly data: CoupangDataVM[]

  constructor(rCode: string, rMessage: string, data: CoupangData[]) {
    this.rCode = rCode
    this.rMessage = rMessage
    this.data = data.map((item) =>
      CoupangDataVM.of(
        item.categoryName,
        item.isRocket,
        item.productId,
        item.productImage,
        item.productName,
        item.productPrice,
        item.productUrl,
        item.isFreeShipping
      )
    )
  }

  static of(rCode: string, rMessage: string, data: CoupangData[]) {
    return new CoupangVM(rCode, rMessage, data)
  }
}
