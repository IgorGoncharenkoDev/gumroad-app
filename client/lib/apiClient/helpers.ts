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
        message: 'Unauthorized',
      }

    case 'forbidden':
      return {
        status: 'error',
        message: 'Forbidden',
      }

    case 'network_error':
      return {
        status: 'error',
        message: error.message ?? 'Network error',
      }

    case 'aborted':
      return {
        status: 'error',
        message: 'Request cancelled',
      }

    default:
      return {
        status: 'error',
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
    throw new Error(result.error.message)
  }

  return result.data
}
