import { BaseInfoDataDTO } from '@/modules/stock/adaptor/out/api/dto/BaseInfoDataDTO'
import { StockBaseInfo } from '@/modules/stock/domain/StockBaseInfo'

export class BaseInfoDataMapper {
  static toDomain(result: BaseInfoDataDTO) {
    return new StockBaseInfo(result.codeDTO, result.advDTO)
  }
}
