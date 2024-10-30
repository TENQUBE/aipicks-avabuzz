import { CoupangAdData } from '@/modules/ad/domain/CoupangAdData'
import { CoupangAdDataDTO } from '@/modules/ad/adaptor/out/api/dto/CoupangAdDataDTO'
import { DtoResolver } from '@/modules/shared/dto/DtoResolver'
import { AdOutPutPort } from '@/modules/ad/application/port/out/AdOutputPort'
import { HttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/HttpClient'
import { CoupangAdDataMapper } from '@/modules/ad/adaptor/out/api/CoupangAdDataMapper'

export class AdApiAdapter implements AdOutPutPort {
  constructor(private readonly httpClient: HttpClientAdapter) {}

  async getCoupangAdData(imageSize: string): Promise<CoupangAdData> {
    const result = await this.httpClient.request<CoupangAdDataDTO>(
      `/api/coupangAd/?deviceId=&subId=thinkpool${imageSize ? `&imageSize=${imageSize}` : ''}`,
      'GET'
    )

    await DtoResolver.validate(result, CoupangAdDataDTO)

    return CoupangAdDataMapper.toDomain(result)
  }
}
