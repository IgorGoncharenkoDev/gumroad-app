import { ValidationError } from '@/types/api.types'

export type ApiErrorType =
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'bad_request'
  | 'conflict'
  | 'external_error'
  | 'timeout'

type ApiErrorOptions = {
  message: string
  type: ApiErrorType
  errors?: ValidationError[]
}

export class ApiError extends Error {
  public readonly type: ApiErrorType
  public readonly errors?: ApiErrorOptions['errors']

  statusCode: number

  constructor({ message, type, errors }: ApiErrorOptions) {
    super(message)

    this.name = 'ApiError'
    this.type = type
    this.errors = errors

    const map: Record<ApiErrorType, number> = {
      unauthorized: 401,
      forbidden: 403,
      not_found: 404,
      bad_request: 400,
      timeout: 408,
      conflict: 409,
      external_error: 502,
    }

    this.statusCode = map[type]
  }

  getValidationFieldError(): ValidationError[] | undefined {
    return this.errors
  }
}
