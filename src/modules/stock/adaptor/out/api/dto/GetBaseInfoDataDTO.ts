import { Type } from 'class-transformer'
import { IsNotEmptyObject, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

class CodeDTO {
  /**
   * 종목코드
   */
  @IsString()
  stock_code: string

  /**
   * 종목명
   */
  @IsString()
  stock_name: string

  /**
   * 종목의 현재가
   */
  @IsNumber()
  curPrice: number

  /**
   * 전일대비 등락률
   */
  @IsNumber()
  ratio: number

  /**
   * 전일대비 변동금액
   */
  @IsNumber()
  fluct_amt: number

  /**
   * 기준시간
   */
  @IsString()
  latestDate: string
}

class AdvDTO {
  /**
   * 매수가
   */
  @IsNumber()
  buy_price: number

  /**
   * 목표가
   */
  @IsNumber()
  goal_price: number

  /**
   * 투자포인트제목
   */
  @IsString()
  cont1: string

  /**
   * 투자포인트내용1
   */
  @IsOptional()
  @IsString()
  cont2?: string

  /**
   * 투자포인트내용2
   */
  @IsOptional()
  @IsString()
  cont3?: string

  /**
   * 투자포인트내용3
   */
  @IsOptional()
  @IsString()
  cont4?: string
}

export class GetBaseInfoDataDTO {
  @IsNotEmptyObject()
  @Type(() => CodeDTO)
  @ValidateNested()
  codeDTO: CodeDTO

  @IsNotEmptyObject()
  @Type(() => AdvDTO)
  @ValidateNested()
  advDTO: AdvDTO
}
