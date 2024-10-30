import { StockUseCase } from '@/modules/stock/application/port/in/StockUseCase'
import { StockOutputPort } from '@/modules/stock/application/port/out/StockOutputPort'
import { AdvBestItem } from '@/modules/stock/domain/AdvBestItem'
import { TodayPick } from '@/modules/stock/domain/TodayPick'
import { BaseInfoData } from '@/modules/stock/domain/BaseInfoData'
import { Signal1yChart } from '@/modules/stock/domain/Signal1yChart'

export class StockService implements StockUseCase {
  constructor(private readonly stockOutputPort: StockOutputPort) {}

  getTodaysPick(): Promise<TodayPick[]> {
    return this.stockOutputPort.getTodaysPick()
  }

  getBaseInfoData(code: string, pms_code: string): Promise<BaseInfoData> {
    return this.stockOutputPort.getBaseInfoData(code, pms_code)
  }

  getSignal1yChart(code: string, pms_code: string): Promise<Signal1yChart> {
    return this.stockOutputPort.getSignal1yChart(code, pms_code)
  }

  getAdvBestItems(): Promise<AdvBestItem[]> {
    return this.stockOutputPort.getAdvBestItems()
  }
}
