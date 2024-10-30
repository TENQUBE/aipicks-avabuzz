export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export interface HttpClientAdapter {
  request<T>(
    url: string,
    method: HttpMethod,
    headers?: Record<string, string | number | boolean>,
    data?: object
  ): Promise<T>
}
