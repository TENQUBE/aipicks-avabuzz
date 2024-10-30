import { HttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/HttpClient'
import { StockApiAdapter } from '@/modules/stock/adaptor/out/api/StockApiAdapter'
import { StockService } from '@/modules/stock/application/service/StockService'
import { StockController } from '@/modules/stock/adaptor/in/ui/StockController'

export default (httpClient: HttpClientAdapter) => {
  const stockAdapter = new StockApiAdapter(httpClient)
  const stockService = new StockService(stockAdapter)
  const stockController = new StockController(stockService)

  return stockController
}
