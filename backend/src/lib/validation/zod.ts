import type { ZodError } from 'zod'

type FormatZodErrorReturn = {
  field: PropertyKey
  message: string
}[]

export function formatZodError (error: ZodError): FormatZodErrorReturn {
  return error.issues.map((issue) => ({
    field: issue.path[0],
    message: issue.message,
  }))
}
