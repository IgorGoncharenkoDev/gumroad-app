import { AppError } from '@/lib/errors/AppError'
import {
  ApiClientResponse,
  ApiClientResult,
  ApiError,
  ApiResponse,
  ClientResult,
  TransportError,
} from '@/types/api.types'

export const mapTransportError = (error: TransportError): ApiError => {
  switch (error.type) {
    case 'unauthorized':
      return {
        status: 'error',
        type: 'unauthorized',
        message: 'Unauthorized',
      }

    case 'forbidden':
      return {
        status: 'error',
        type: 'forbidden',
        message: 'Forbidden',
      }

    case 'network_error':
      return {
        status: 'error',
        type: 'external_error',
        message: error.message ?? 'Network error',
      }

    case 'aborted':
      return {
        status: 'error',
        type: 'external_error',
        message: 'Request cancelled',
      }

    case 'unknown_error':
      return {
        status: 'error',
        type: 'external_error',
        message: error.message ?? 'Unknown error',
      }

    default:
      return {
        status: 'error',
        type: 'external_error',
        message: 'Unknown error',
      }
  }
}

/* How to consume:

  const result = unwrapApiResult(await apiClient.fn())
  if (!result.ok) {
    ...
  }

*/
export const unwrapApiResult = <T>(
  result: ClientResult<ApiResponse<T>>,
): ApiClientResult<T> => {
  if (result.type !== 'success') {
    return {
      ok: false,
      error: mapTransportError(result),
    }
  }

  if (result.data.status === 'error') {
    return {
      ok: false,
      error: {
        status: 'error',
        type: result.data.type,
        message: result.data.message,
      },
    }
  }

  return {
    ok: true,
    data: result.data.data,
  }
}

/* How to consume:

  queryFn: () => unwrapApiResultOrThrow(apiClient.user.getStats()),
  mutationFn: () => unwrapApiResultOrThrow(apiClient.user.syncUser())

* */
export async function unwrapApiResultOrThrow<T>(
  promise: Promise<ApiClientResponse<T>>,
): Promise<T> {
  const result = unwrapApiResult(await promise)

  if (!result.ok) {
    throw new AppError(result.error.type, result.error.message)
  }

  return result.data
}
