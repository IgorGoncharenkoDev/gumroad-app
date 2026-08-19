import type { Request } from 'express'

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

export type RequestWithBody<TBody> = Request<
  Record<string, never>,
  unknown,
  TBody
>

export type RequestWithParams<TParams> = Request<TParams>

export type RequestWithQuery<TQuery> = Request<
  Record<string, never>,
  unknown,
  Record<string, never>,
  TQuery
>