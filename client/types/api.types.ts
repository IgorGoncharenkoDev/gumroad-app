import { AppErrorType } from '@/lib/errors/AppError'

export type ValidationError = {
  field: string
  message: string
}

export type TransportError =
  | { type: 'unauthorized', message?: string }
  | { type: 'aborted' }
  | { type: 'forbidden' }
  | { type: 'network_error'; message?: string }
  | { type: 'unknown_error'; message?: string; errors?: ValidationError[] }

export type ClientResult<T> = TransportError | { type: 'success'; data: T }

export type ApiSuccess<T> = {
  status: 'success'
  message?: string
  data: T
}

export type ApiError = {
  status: 'error'
  type: AppErrorType
  message: string
  errors?: ValidationError[]
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