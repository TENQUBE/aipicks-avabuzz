import { AdvBestItemDTO } from '@/modules/stock/adaptor/out/api/dto/AdvBestItemDTO'
import { AdvBestStock } from '@/modules/stock/domain/AdvBestStock'

export class AdvBestItemMapper {
  static toDomain(result: AdvBestItemDTO) {
    return new AdvBestStock(
      result.stock_code,
      result.stock_name,
      result.buy_datedeal,
      result.buy_price,
      result.sell_datedeal,
      result.sell_price,
      result.total_rate,
      result.pms_name
    )
  }
}
