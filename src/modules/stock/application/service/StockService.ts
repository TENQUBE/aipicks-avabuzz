import { StockUseCase } from '@/modules/stock/application/port/in/StockUseCase'
import { StockOutputPort } from '@/modules/stock/application/port/out/StockOutputPort'
import { StockBaseInfo } from '@/modules/stock/domain/StockBaseInfo'
import { RecommendedStock } from '@/modules/stock/domain/RecommendedStock'
import { StockSignalInfo } from '@/modules/stock/domain/StockSignalInfo'
import { AdvBestStock } from '@/modules/stock/domain/AdvBestStock'

export class StockService implements StockUseCase {
  constructor(private readonly stockOutputPort: StockOutputPort) {}

  getTodaysPick(): Promise<RecommendedStock[]> {
    return this.stockOutputPort.getTodaysPick()
  }

  getBaseInfoData(code: string, pms_code: string): Promise<StockBaseInfo> {
    return this.stockOutputPort.getBaseInfoData(code, pms_code)
  }

  getSignal1yChart(code: string, pms_code: string): Promise<StockSignalInfo> {
    return this.stockOutputPort.getSignal1yChart(code, pms_code)
  }

  getAdvBestItems(): Promise<AdvBestStock[]> {
    return this.stockOutputPort.getAdvBestItems()
  }
}
