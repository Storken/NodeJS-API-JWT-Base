import 'dotenv/config'

export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
export const JWT_SECRET = process.env.TOKEN_KEY
