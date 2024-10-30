import { Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'

class SeriesDTO {
  /**
   * 주가리스트
   */
  @IsNumber({}, { each: true })
  data: number[]
}

class CategoriesDTO {
  /**
   * 날짜리스트
   */
  @IsString({ each: true })
  data: string[]
}

class AnnotationImageDTO {
  /**
   * 매수/매도 신호 이미지주소
   */
  @IsString()
  path: string
}

class AnnotationDTO {
  /**
   * 매매신호 X축 날짜
   */
  @IsString()
  x: string

  /**
   * 매매신호 Y축 주가
   */
  @IsNumber()
  y: number

  /**
   * 신호가격(매수/매도가)
   */
  @IsNumber()
  real: number

  /**
   * up(매수)/down(매도)
   */
  @IsIn(['up', 'down'])
  arrow: 'up' | 'down'

  @IsNotEmptyObject()
  @Type(() => AnnotationImageDTO)
  @ValidateNested()
  image: AnnotationImageDTO
}

class StatusDTO {
  /**
   * 적중률
   */
  @IsNumber()
  win_rate: number

  /**
   * 최대수익률
   */
  @IsNumber()
  max_rate: number

  /**
   * 누적수익률
   */
  @IsNumber()
  total_rate: number
}

export class GetSignal1yChartDTO {
  @IsNotEmptyObject()
  @Type(() => SeriesDTO)
  @ValidateNested()
  series: SeriesDTO

  @IsNotEmptyObject()
  @Type(() => CategoriesDTO)
  @ValidateNested()
  categories: CategoriesDTO

  @IsArray()
  @Type(() => AnnotationDTO)
  @ValidateNested({ each: true })
  annotation: AnnotationDTO[]

  @IsOptional()
  @Type(() => StatusDTO)
  @ValidateNested()
  status?: StatusDTO

  /**
   * 종목의 일봉차트 주소
   */
  @IsString()
  chartName: string
}
