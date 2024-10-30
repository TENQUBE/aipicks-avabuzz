import { Annotation, Categories, Series, Status } from '@/modules/stock/domain/StockSignalInfo'

export class StockSignalInfoVM {
  readonly series: Series
  readonly categories: Categories
  readonly annotation: Annotation[]
  readonly status?: Status
  readonly chartName: string

  constructor(
    series: Series,
    categories: Categories,
    annotation: Annotation[],
    chartName: string,
    status?: Status
  ) {
    this.series = series
    this.categories = categories
    this.annotation = annotation
    this.chartName = chartName
    this.status = status
  }

  static of(
    series: Series,
    categories: Categories,
    annotation: Annotation[],
    chartName: string,
    status?: Status
  ) {
    return new StockSignalInfoVM(series, categories, annotation, chartName, status)
  }
}
