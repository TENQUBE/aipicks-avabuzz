import { Coupang } from '@/modules/ad/domain/Coupang'
import { GetCoupangDTO } from '@/modules/ad/adaptor/out/api/dto/GetCoupangDTO'
import { DtoResolver } from '@/modules/shared/dto/DtoResolver'
import { AdOutPutPort } from '@/modules/ad/application/port/out/AdOutputPort'
import { HttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/HttpClient'
import { CoupangMapper } from '@/modules/ad/adaptor/out/api/CoupangMapper'

export class AdApiAdapter implements AdOutPutPort {
  constructor(private readonly httpClient: HttpClientAdapter) {}

  async getCoupang(imageSize: string): Promise<Coupang> {
    const result = await this.httpClient.request<GetCoupangDTO>(
      `/api/coupangAd/?deviceId=&subId=thinkpool${imageSize ? `&imageSize=${imageSize}` : ''}`,
      'GET'
    )

    await DtoResolver.validate(result, GetCoupangDTO)

    return CoupangMapper.toDomain(result)
  }
}
