import { CoupangAdDataDTO } from '@/modules/ad/adaptor/out/api/dto/CoupangAdDataDTO'
import { CoupangAdData } from '@/modules/ad/domain/CoupangAdData'

export class CoupangAdDataMapper {
  static toDomain(result: CoupangAdDataDTO) {
    return new CoupangAdData(result.rCode, result.rMessage, result.data)
  }
}
