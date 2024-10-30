import { FetchHttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/FetchHttpClient'
import { HttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/HttpClient'
import { StockController } from '@/modules/stock/adaptor/in/ui/StockController'
import { AdController } from '@/modules/ad/adaptor/in/AdController'
import StockModule from '@/modules/stock/StockModule'
import AdModule from '@/modules/ad/AdModule'

export class AppModule {
  constructor(readonly stock: StockController, readonly ad: AdController) {}

  static inject() {
    const fetchhttpClientAdapter: HttpClientAdapter = new FetchHttpClientAdapter()

    const stockController = StockModule(fetchhttpClientAdapter)
    const adController = AdModule(fetchhttpClientAdapter)

    return new AppModule(stockController, adController)
  }
}

export default (() => {
  const app = AppModule.inject()

  return app
})()
