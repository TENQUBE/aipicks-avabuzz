import { AdvBestItem } from '@/modules/stock/domain/AdvBestItem'
import { TodayPick } from '@/modules/stock/domain/TodayPick'
import { BaseInfoData } from '@/modules/stock/domain/BaseInfoData'
import { Signal1yChart } from '@/modules/stock/domain/Signal1yChart'

export interface StockOutputPort {
  getTodaysPick(): Promise<TodayPick[]>
  getBaseInfoData(code: string, pms_code: string): Promise<BaseInfoData>
  getSignal1yChart(code: string, pms_code: string): Promise<Signal1yChart>
  getAdvBestItems(): Promise<AdvBestItem[]>
}
