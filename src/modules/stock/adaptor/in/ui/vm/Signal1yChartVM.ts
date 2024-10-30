import {
  Annotation,
  ArrowType,
  Categories,
  Series,
  Status
} from '@/modules/stock/domain/Signal1yChart'

export class SeriesVM {
  readonly data: number[]

  constructor(data: number[]) {
    this.data = data
  }

  static of(data: number[]) {
    return new SeriesVM(data)
  }
}

export class CategoriesVM {
  readonly data: string[]

  constructor(data: string[]) {
    this.data = data
  }

  static of(data: string[]) {
    return new CategoriesVM(data)
  }
}

export class AnnotationImageVM {
  readonly path: string

  constructor(path: string) {
    this.path = path
  }

  static of(path: string) {
    return new AnnotationImageVM(path)
  }
}

export class AnnotationVM {
  readonly x: string
  readonly y: number
  readonly real: number
  readonly arrow: ArrowType
  readonly image: AnnotationImageVM

  constructor(x: string, y: number, real: number, arrow: ArrowType, image: { path: string }) {
    this.x = x
    this.y = y
    this.real = real
    this.arrow = arrow
    this.image = new AnnotationImageVM(image.path)
  }

  static of(x: string, y: number, real: number, arrow: ArrowType, image: { path: string }) {
    return new AnnotationVM(x, y, real, arrow, image)
  }
}

export class StatusVM {
  readonly win_rate?: number
  readonly max_rate?: number
  readonly total_rate?: number

  constructor(win_rate?: number, max_rate?: number, total_rate?: number) {
    this.win_rate = win_rate
    this.max_rate = max_rate
    this.total_rate = total_rate
  }

  static of(win_rate?: number, max_rate?: number, total_rate?: number) {
    return new StatusVM(win_rate, max_rate, total_rate)
  }
}

export class Signal1yChartVM {
  readonly series: SeriesVM
  readonly categories: CategoriesVM
  readonly annotation: AnnotationVM[]
  readonly status?: StatusVM
  readonly chartName: string

  constructor(
    series: Series,
    categories: Categories,
    annotation: Annotation[],
    chartName: string,
    status?: Status
  ) {
    this.series = new SeriesVM(series.data)
    this.categories = new CategoriesVM(categories.data)
    this.annotation = annotation.map(
      (item) => new AnnotationVM(item.x, item.y, item.real, item.arrow, item.image)
    )
    this.chartName = chartName
    this.status = new StatusVM(status?.win_rate, status?.max_rate, status?.total_rate)
  }

  static of(
    series: Series,
    categories: Categories,
    annotation: Annotation[],
    chartName: string,
    status?: Status
  ) {
    return new Signal1yChartVM(series, categories, annotation, chartName, status)
  }
}
