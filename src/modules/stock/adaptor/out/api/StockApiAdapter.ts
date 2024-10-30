import { DtoResolver } from '@/modules/shared/dto/DtoResolver'
import { HttpClientAdapter } from '@/modules/shared/adaptor/out/http-client/HttpClient'
import { TodayPick } from '@/modules/stock/domain/TodayPick'
import { GetTodaysPickDTO } from '@/modules/stock/adaptor/out/api/dto/GetTodaysPickDTO'
import { StockOutputPort } from '@/modules/stock/application/port/out/StockOutputPort'
import { TodayPickMapper } from '@/modules/stock/adaptor/out/api/TodayPickMapper'
import { GetBaseInfoDataDTO } from '@/modules/stock/adaptor/out/api/dto/GetBaseInfoDataDTO'
import { BaseInfoData } from '@/modules/stock/domain/BaseInfoData'
import { BaseInfoDataMapper } from '@/modules/stock/adaptor/out/api/BaseInfoDataMapper'
import { Signal1yChart } from '@/modules/stock/domain/Signal1yChart'
import { GetSignal1yChartDTO } from '@/modules/stock/adaptor/out/api/dto/GetSignal1yChartDTO'
import { Signal1yChartMapper } from '@/modules/stock/adaptor/out/api/Signal1yChartMapper'
import { AdvBestItem } from '@/modules/stock/domain/AdvBestItem'
import { GetAdvBestItemDTO } from '@/modules/stock/adaptor/out/api/dto/GetAdvBestItemDTO'
import { AdvBestItemMapper } from '@/modules/stock/adaptor/out/api/AdvBestItemMapper'

export class StockApiAdapter implements StockOutputPort {
  constructor(private readonly httpClient: HttpClientAdapter) {}

  async getTodaysPick(): Promise<TodayPick[]> {
    const result = await this.httpClient.request<GetTodaysPickDTO[]>(`/api/todaysPick`, 'GET')

    await DtoResolver.validate(result, GetTodaysPickDTO)

    return result.map((result) => TodayPickMapper.toDomain(result))
  }

  async getBaseInfoData(code: string, pms_code: string): Promise<BaseInfoData> {
    const result = await this.httpClient.request<GetBaseInfoDataDTO>(
      `/api/baseInfoData/?code=${code}&pms_code=${pms_code}`,
      'GET'
    )

    await DtoResolver.validate(result, GetBaseInfoDataDTO)

    return BaseInfoDataMapper.toDomain(result)
  }

  async getSignal1yChart(code: string, pms_code: string): Promise<Signal1yChart> {
    const result = await this.httpClient.request<GetSignal1yChartDTO>(
      `/api/signal1yChart/?code=${code}&pms_code=${pms_code}`,
      'GET'
    )

    await DtoResolver.validate(result, GetSignal1yChartDTO)

    return Signal1yChartMapper.toDomain(result)
  }

  async getAdvBestItems(): Promise<AdvBestItem[]> {
    const result = await this.httpClient.request<GetAdvBestItemDTO[]>(`/api/advBestItems`, 'GET')

    await Promise.all(result.map((result) => DtoResolver.validate(result, GetAdvBestItemDTO)))

    return result.map((result) => AdvBestItemMapper.toDomain(result))
  }
}
