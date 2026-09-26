export type AppErrorType =
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'bad_request'
  | 'conflict'
  | 'external_error'
  | 'timeout'

export class AppError extends Error {
  statusCode: number

  constructor(
    public readonly type: AppErrorType,
    message: string,
  ) {
    super(message)

    this.name = 'AppError'

    const map: Record<AppErrorType, number> = {
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
}

/* How to use:
    if (condition) {
      throw new AppError('unauthorized', 'Unauthorized')

      // OR:
      throw new AppError('not_found', 'User not found')
    }
*/
