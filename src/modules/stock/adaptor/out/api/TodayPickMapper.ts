import { GetTodaysPickDTO } from '@/modules/stock/adaptor/out/api/dto/GetTodaysPickDTO'
import { TodayPick } from '@/modules/stock/domain/TodayPick'

export class TodayPickMapper {
  static toDomain(dto: GetTodaysPickDTO) {
    return new TodayPick(dto.stock_code, dto.stock_name, dto.pms_code, dto.sector)
  }
}
