import { HttpClientAdapter, HttpMethod } from '@/modules/shared/adaptor/out/http-client/HttpClient'

export class FetchHttpClientAdapter implements HttpClientAdapter {
  async request<T>(
    url: string,
    method: HttpMethod,
    headers?: Record<string, string | number | boolean>,
    data?: object
  ): Promise<T> {
    try {
      const requestInit: RequestInit = {
        method
      }

      if (headers) {
        const headerList: [string, string][] = Object.entries(headers).map(([key, value]) => [
          key,
          `${value}`
        ])

        requestInit.headers = headerList
      }

      if (data) {
        requestInit.body = JSON.stringify(data)
      }

      const response = await fetch(url, requestInit)

      const result = await response.json()

      return result
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Internal Server Error')
    }
  }
}
