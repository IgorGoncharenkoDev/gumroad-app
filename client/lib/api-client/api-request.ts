import { ClientResult } from '@/types/api.types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export async function apiRequest<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<ClientResult<TResponse>> {
  const url = `${API_BASE_URL}/api${path}`

  const isFormData = options.body instanceof FormData

  const config: RequestInit = {
    ...options,
    method: options.method ?? 'GET',
    headers: {
      ...(!isFormData && options.body
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...(options.headers ?? {}),
    },
  }

  try {
    const response = await fetch(url, {
      // makes sure cookies are sent if the frontend/backend are ever split
      credentials: 'include',
      ...config,
    })

    if (response.status === 204) {
      return {
        type: 'success',
        data: undefined as TResponse,
      }
    }
    if (response.status === 401) return { type: 'unauthorized' }
    if (response.status === 403) return { type: 'forbidden' }

    if (!response.ok) {
      const error: { message?: string } = await response
        .json()
        .catch(() => ({}))

      return {
        type: 'unknown_error',
        message: error.message ?? 'Request failed',
      }
    }

    const data = (await response.json()) as TResponse

    return {
      type: 'success',
      data,
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return {
        type: 'aborted',
      }
    }

    return {
      type: 'network_error',
      message: err instanceof Error ? err.message : 'Network error',
    }
  }
}