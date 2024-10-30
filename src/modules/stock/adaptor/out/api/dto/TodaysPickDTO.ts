import { IsString } from 'class-validator'

export class TodaysPickDTO {
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
   * 전략코드
   */
  @IsString()
  pms_code: string

  @IsString()
  sector: string
}
