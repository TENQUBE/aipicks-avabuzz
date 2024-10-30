import { DtoResolver } from '@/modules/shared/dto/DtoResolver'
import { HttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/HttpClient'
import { RecommendedStock } from '@/modules/stock/domain/RecommendedStock'
import { TodaysPickDTO } from '@/modules/stock/adaptor/out/api/dto/TodaysPickDTO'
import { StockOutputPort } from '@/modules/stock/application/port/out/StockOutputPort'
import { TodaysPickMapper } from '@/modules/stock/adaptor/out/api/TodaysPickMapper'
import { BaseInfoDataDTO } from '@/modules/stock/adaptor/out/api/dto/BaseInfoDataDTO'
import { StockBaseInfo } from '@/modules/stock/domain/StockBaseInfo'
import { BaseInfoDataMapper } from '@/modules/stock/adaptor/out/api/BaseInfoDataMapper'
import { StockSignalInfo } from '@/modules/stock/domain/StockSignalInfo'
import { Signal1yChartDTO } from '@/modules/stock/adaptor/out/api/dto/Signal1yChartDTO'
import { Signal1yChartMapper } from '@/modules/stock/adaptor/out/api/Signal1yChartMapper'
import { AdvBestStock } from '@/modules/stock/domain/AdvBestStock'
import { AdvBestItemDTO } from '@/modules/stock/adaptor/out/api/dto/AdvBestItemDTO'
import { AdvBestItemMapper } from '@/modules/stock/adaptor/out/api/AdvBestItemMapper'

export class StockApiAdapter implements StockOutputPort {
  constructor(private readonly httpClient: HttpClientAdapter) {}

  async getTodaysPick(): Promise<RecommendedStock[]> {
    const result = await this.httpClient.request<TodaysPickDTO[]>(`/api/todaysPick`, 'GET')

    await DtoResolver.validate(result, TodaysPickDTO)

    return result.map((result) => TodaysPickMapper.toDomain(result))
  }

  async getBaseInfoData(code: string, pms_code: string): Promise<StockBaseInfo> {
    const result = await this.httpClient.request<BaseInfoDataDTO>(
      `/api/baseInfoData/?code=${code}&pms_code=${pms_code}`,
      'GET'
    )

    await DtoResolver.validate(result, BaseInfoDataDTO)

    return BaseInfoDataMapper.toDomain(result)
  }

  async getSignal1yChart(code: string, pms_code: string): Promise<StockSignalInfo> {
    const result = await this.httpClient.request<Signal1yChartDTO>(
      `/api/signal1yChart/?code=${code}&pms_code=${pms_code}`,
      'GET'
    )

    await DtoResolver.validate(result, Signal1yChartDTO)

    return Signal1yChartMapper.toDomain(result)
  }

  async getAdvBestItems(): Promise<AdvBestStock[]> {
    const result = await this.httpClient.request<AdvBestItemDTO[]>(`/api/advBestItems`, 'GET')

    await Promise.all(result.map((result) => DtoResolver.validate(result, AdvBestItemDTO)))

    return result.map((result) => AdvBestItemMapper.toDomain(result))
  }
}
