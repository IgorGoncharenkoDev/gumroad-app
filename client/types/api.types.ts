export type TransportError =
  | { type: 'unauthorized' }
  | { type: 'aborted' }
  | { type: 'forbidden' }
  | { type: 'network_error'; message?: string }
  | { type: 'unknown_error'; message?: string }

export type ClientResult<T> = TransportError | { type: 'success'; data: T }

export type ApiSuccess<T> = {
  status: 'success'
  message?: string
  data: T
}

export type ApiError = {
  status: 'error'
  message: string
}

// API contract
export type ApiResponse<T> = ApiSuccess<T> | ApiError

// client wrapper
export type ApiClientResponse<T> = ClientResult<ApiResponse<T>>

export type ApiClientResult<T> =
  | {
  ok: true
  data: T
}
  | {
  ok: false
  error: ApiError
}