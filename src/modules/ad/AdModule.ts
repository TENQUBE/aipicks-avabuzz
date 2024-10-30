import { HttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/HttpClient'
import { AdApiAdapter } from '@/modules/ad/adaptor/out/api/AdApiAdapter'
import { AdService } from '@/modules/ad/application/service/AdService'
import { AdController } from '@/modules/ad/adaptor/in/AdController'

export default (httpClient: HttpClientAdapter) => {
  const adApiAdapter = new AdApiAdapter(httpClient)

  const adService = new AdService(adApiAdapter)

  return new AdController(adService)
}
