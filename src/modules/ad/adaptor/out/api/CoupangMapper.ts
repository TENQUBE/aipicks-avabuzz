import { GetCoupangDTO } from '@/modules/ad/adaptor/out/api/dto/GetCoupangDTO'
import { Coupang } from '@/modules/ad/domain/Coupang'

export class CoupangMapper {
  static toDomain(dto: GetCoupangDTO) {
    return new Coupang(dto.rCode, dto.rMessage, dto.data)
  }
}
