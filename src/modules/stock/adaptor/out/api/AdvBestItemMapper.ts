import { GetAdvBestItemDTO } from '@/modules/stock/adaptor/out/api/dto/GetAdvBestItemDTO'
import { AdvBestItem } from '@/modules/stock/domain/AdvBestItem'

export class AdvBestItemMapper {
  static toDomain(dto: GetAdvBestItemDTO) {
    return new AdvBestItem(
      dto.stock_code,
      dto.stock_name,
      dto.buy_datedeal,
      dto.buy_price,
      dto.sell_datedeal,
      dto.sell_price,
      dto.total_rate,
      dto.pms_name
    )
  }
}
