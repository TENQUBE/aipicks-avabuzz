import { Signal1yChart } from '@/modules/stock/domain/Signal1yChart'
import { GetSignal1yChartDTO } from '@/modules/stock/adaptor/out/api/dto/GetSignal1yChartDTO'

export class Signal1yChartMapper {
  static toDomain(dto: GetSignal1yChartDTO) {
    return new Signal1yChart(dto.series, dto.categories, dto.annotation, dto.chartName, dto.status)
  }
}
