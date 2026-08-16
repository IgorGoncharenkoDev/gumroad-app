import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'

import { ValidationError } from '@/errors/validation.error'

interface ValidationSchemas {
  body?: ZodType
  params?: ZodType
  query?: ZodType
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body)

      if (!result.success) {
        throw new ValidationError(result.error.flatten())
      }

      req.body = result.data
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params)

      if (!result.success) {
        throw new ValidationError(result.error.flatten())
      }

      req.params = result.data
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query)

      if (!result.success) {
        throw new ValidationError(result.error.flatten())
      }

      req.query = result.data
    }

    next()
  }
}
