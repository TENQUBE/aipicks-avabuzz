import { GetBaseInfoDataDTO } from '@/modules/stock/adaptor/out/api/dto/GetBaseInfoDataDTO'
import { BaseInfoData } from '@/modules/stock/domain/BaseInfoData'

export class BaseInfoDataMapper {
  static toDomain(dto: GetBaseInfoDataDTO) {
    return new BaseInfoData(dto.codeDTO, dto.advDTO)
  }
}
