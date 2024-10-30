import { TodaysPickDTO } from '@/modules/stock/adaptor/out/api/dto/TodaysPickDTO'
import { RecommendedStock } from '@/modules/stock/domain/RecommendedStock'

export class TodaysPickMapper {
  static toDomain(result: TodaysPickDTO) {
    return new RecommendedStock(
      result.stock_code,
      result.stock_name,
      result.pms_code,
      result.sector
    )
  }
}
