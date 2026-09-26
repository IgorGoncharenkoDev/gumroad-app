import { AppError } from './app.error'

export class TimeoutError extends AppError {
  constructor(message = 'Request Timeout') {
    super(408, 'timeout', message)
  }
}