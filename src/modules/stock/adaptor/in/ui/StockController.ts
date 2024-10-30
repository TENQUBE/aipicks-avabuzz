import { StockUseCase } from '@/modules/stock/application/port/in/StockUseCase'
import { TodayPickVM } from '@/modules/stock/adaptor/in/ui/vm/TodayPickVM'
import { BaseInfoDataVM } from '@/modules/stock/adaptor/in/ui/vm/BaseInfoDataVM'
import { Signal1yChartVM } from '@/modules/stock/adaptor/in/ui/vm/Signal1yChartVM'
import { AdvBestItemVM } from '@/modules/stock/adaptor/in/ui/vm/AdvBestItemVM'

export class StockController {
  constructor(private readonly stockUseCase: StockUseCase) {}

  /**
   * 오늘의 추천종목 (3종목) 조회하기
   * @returns {TodayPickVM[]} 오늘의 추천종목 (3종목)
   */
  async getTodayPicks(): Promise<TodayPickVM[]> {
    const todaysPick = await this.stockUseCase.getTodaysPick()

    return todaysPick.map((item) =>
      TodayPickVM.of(item.getStockCode(), item.getStockName(), item.getPmsCode(), item.getSector())
    )
  }

  /**
   * 종목별 정보 조회하기
   * @param {string} code 종목코드
   * @param {string} pms_code 전략코드
   * @returns {BaseInfoDataVM} 종목별 정보
   */
  async getBaseInfoData(code: string, pms_code: string): Promise<BaseInfoDataVM> {
    const baseInfoData = await this.stockUseCase.getBaseInfoData(code, pms_code)

    return BaseInfoDataVM.of(baseInfoData.getCode(), baseInfoData.getAdv())
  }

  /**
   * 매매신호 1년 차트 데이터 조회하기
   * @param {string} code 종목코드
   * @param {string} pms_code 전략코드
   * @returns {Signal1yChartVM} 매매신호 1년 차트 데이터
   */
  async getSignal1yChart(code: string, pms_code: string): Promise<Signal1yChartVM> {
    const signal1yChart = await this.stockUseCase.getSignal1yChart(code, pms_code)

    return Signal1yChartVM.of(
      signal1yChart.getSeries(),
      signal1yChart.getCategories(),
      signal1yChart.getAnnotation(),
      signal1yChart.getChartName(),
      signal1yChart.getStatus()
    )
  }

  /**
   * 베스트수익률(최근 3개월) 조회하기
   * @returns {AdvBestItemVM[]} 베스트수익률(최근 3개월)
   */
  async getAdvBestItems(): Promise<AdvBestItemVM[]> {
    const advBestItems = await this.stockUseCase.getAdvBestItems()

    return advBestItems.map((item) =>
      AdvBestItemVM.of(
        item.getStockCode(),
        item.getStockName(),
        item.getBuyDatedeal(),
        item.getBuyPrice(),
        item.getSellDatedeal(),
        item.getSellPrice(),
        item.getTotalRate(),
        item.getPmsName()
      )
    )
  }
}
