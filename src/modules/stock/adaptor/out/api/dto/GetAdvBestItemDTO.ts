import { IsNumber, IsString } from 'class-validator'

export class GetAdvBestItemDTO {
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
   * 매수일
   */
  @IsString()
  buy_datedeal: string

  /**
   * 매수가
   */
  @IsNumber()
  buy_price: number

  /**
   * 매도일
   */
  @IsString()
  sell_datedeal: string

  /**
   * 매도가
   */
  @IsNumber()
  sell_price: number

  /**
   * 수익률
   */
  @IsString()
  total_rate: string

  /**
   * 전략명
   */
  @IsString()
  pms_name: string
}
