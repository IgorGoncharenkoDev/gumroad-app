import { z } from 'zod'

export const registerUserSchema = z.object({
  email: z.email().toLowerCase().trim(),
  name: z.string().min(2).trim(),
  password: z.string().min(8).trim(),
})

export type RegisterUserRequestBodyDTO = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8).trim(),
})

export type LoginUserRequestBodyDTO = z.infer<typeof loginUserSchema>