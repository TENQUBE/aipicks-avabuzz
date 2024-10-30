export interface Series {
  data: number[]
}

export interface Categories {
  data: string[]
}

export type ArrowType = 'up' | 'down'

export interface Annotation {
  x: string
  y: number
  real: number
  arrow: ArrowType
  image: {
    path: string
  }
}

export interface Status {
  win_rate: number
  max_rate: number
  total_rate: number
}

export class Signal1yChart {
  constructor(
    private readonly series: Series,
    private readonly categories: Categories,
    private readonly annotation: Annotation[],
    private readonly chartName: string,
    private readonly status?: Status
  ) {}

  getSeries() {
    return this.series
  }

  getCategories() {
    return this.categories
  }

  getAnnotation() {
    return this.annotation
  }

  getChartName() {
    return this.chartName
  }

  getStatus() {
    return this.status
  }
}
