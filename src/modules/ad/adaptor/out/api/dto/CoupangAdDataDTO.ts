import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class CoupangAdProduct {
  @IsString()
  categoryName: string

  @IsBoolean()
  @IsOptional()
  isFreeShipping?: boolean

  @IsBoolean()
  isRocket: boolean

  @IsNumber()
  productId: number

  @IsString()
  productImage: string

  @IsString()
  productName: string

  @IsNumber()
  productPrice: number

  @IsString()
  productUrl: string
}

export class CoupangAdDataDTO {
  @IsString()
  rCode: string

  @IsString()
  rMessage: string

  @IsArray()
  @Type(() => CoupangAdProduct)
  @ValidateNested({ each: true })
  data: CoupangAdProduct[]
}
