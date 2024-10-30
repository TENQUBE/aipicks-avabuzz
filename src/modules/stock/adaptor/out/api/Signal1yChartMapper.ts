import { StockSignalInfo } from '@/modules/stock/domain/StockSignalInfo'
import { Signal1yChartDTO } from '@/modules/stock/adaptor/out/api/dto/Signal1yChartDTO'

export class Signal1yChartMapper {
  static toDomain(result: Signal1yChartDTO) {
    return new StockSignalInfo(
      result.series,
      result.categories,
      result.annotation,
      result.chartName,
      result.status
    )
  }
}
