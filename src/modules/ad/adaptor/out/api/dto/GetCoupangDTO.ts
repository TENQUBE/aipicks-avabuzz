import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class CoupangDataDTO {
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

export class GetCoupangDTO {
  @IsString()
  rCode: string

  @IsString()
  rMessage: string

  @IsArray()
  @Type(() => CoupangDataDTO)
  @ValidateNested({ each: true })
  data: CoupangDataDTO[]
}
