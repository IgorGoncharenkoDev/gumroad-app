import { AppError } from './app.error'

export class ValidationError
  extends AppError
{
  constructor(
    public readonly errors: unknown,
  ) {
    super(
      400,
      'Request validation failed',
    )
  }
}