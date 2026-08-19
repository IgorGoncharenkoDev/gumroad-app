import bcrypt from 'bcryptjs'

export async function createHashedPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(rawPassword, salt)
}

type ComparePasswordsParams = {
  rawPassword: string
  hashedPassword: string
}

export async function comparePasswords({
  hashedPassword,
  rawPassword,
}: ComparePasswordsParams) {
  return await bcrypt.compare(rawPassword, hashedPassword)
}
