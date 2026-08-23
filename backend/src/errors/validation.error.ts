import { AppError } from './app.error'

export class ValidationError extends AppError {
  constructor(public readonly errors: unknown) {
    super(400, 'bad_request', 'Request validation failed')
  }
}

/*
* How to consume:

    throw new ValidationError({
      message: 'User already exists',
      details: {
        detail1: '..',
        detail2: '..',
      },
    })
  }
*
* */