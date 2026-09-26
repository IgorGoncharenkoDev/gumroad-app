import { AppError } from './app.error'

export class ExternalError
  extends AppError
{
  constructor(
    message = 'External error',
  ) {
    super(502, 'external_error', message)
  }
}