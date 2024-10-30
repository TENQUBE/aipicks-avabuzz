import { StockUseCase } from '@/modules/stock/application/port/in/StockUseCase'
import { RecommendedStockVM } from '@/modules/stock/adaptor/in/ui/vm/RecommendedStockVM'
import { StockBaseInfoDataVM } from '@/modules/stock/adaptor/in/ui/vm/StockBaseInfoDataVM'
import { StockSignalInfoVM } from '@/modules/stock/adaptor/in/ui/vm/StockSignalInfoVM'
import { AdvBestStockVM } from '@/modules/stock/adaptor/in/ui/vm/AdvBestStockVM'

export class StockController {
  constructor(private readonly stockUseCase: StockUseCase) {}

  /**
   * 오늘의 추천종목 (3종목) 조회하기
   * @returns {RecommendedStockVM[]} 오늘의 추천종목 (3종목)
   */
  async getTodayPicks(): Promise<RecommendedStockVM[]> {
    const result = await this.stockUseCase.getTodaysPick()

    return result.map((result) =>
      RecommendedStockVM.of(
        result.getStockCode(),
        result.getStockName(),
        result.getPmsCode(),
        result.getSector()
      )
    )
  }

  /**
   * 종목별 정보 조회하기
   * @param {string} code 종목코드
   * @param {string} pms_code 전략코드
   * @returns {StockBaseInfoDataVM} 종목별 정보
   */
  async getBaseInfoData(code: string, pms_code: string): Promise<StockBaseInfoDataVM> {
    const result = await this.stockUseCase.getBaseInfoData(code, pms_code)

    return StockBaseInfoDataVM.of(result.getCode(), result.getAdv())
  }

  /**
   * 매매신호 1년 차트 데이터 조회하기
   * @param {string} code 종목코드
   * @param {string} pms_code 전략코드
   * @returns {StockSignalInfoVM} 매매신호 1년 차트 데이터
   */
  async getSignal1yChart(code: string, pms_code: string): Promise<StockSignalInfoVM> {
    const result = await this.stockUseCase.getSignal1yChart(code, pms_code)

    return StockSignalInfoVM.of(
      result.getSeries(),
      result.getCategories(),
      result.getAnnotation(),
      result.getChartName(),
      result.getStatus()
    )
  }

  /**
   * 베스트수익률(최근 3개월) 조회하기
   * @returns {AdvBestStockVM[]} 베스트수익률(최근 3개월)
   */
  async getAdvBestItems(): Promise<AdvBestStockVM[]> {
    const result = await this.stockUseCase.getAdvBestItems()

    return result.map((result) =>
      AdvBestStockVM.of(
        result.getStockCode(),
        result.getStockName(),
        result.getBuyDatedeal(),
        result.getBuyPrice(),
        result.getSellDatedeal(),
        result.getSellPrice(),
        result.getTotalRate(),
        result.getPmsName()
      )
    )
  }
}
