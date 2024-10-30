import { AdvBestStock } from '@/modules/stock/domain/AdvBestStock'
import { RecommendedStock } from '@/modules/stock/domain/RecommendedStock'
import { StockBaseInfo } from '@/modules/stock/domain/StockBaseInfo'
import { StockSignalInfo } from '@/modules/stock/domain/StockSignalInfo'

export interface StockOutputPort {
  getTodaysPick(): Promise<RecommendedStock[]>
  getBaseInfoData(code: string, pms_code: string): Promise<StockBaseInfo>
  getSignal1yChart(code: string, pms_code: string): Promise<StockSignalInfo>
  getAdvBestItems(): Promise<AdvBestStock[]>
}
