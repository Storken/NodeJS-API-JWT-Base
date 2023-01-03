import { dbPath } from './constants'
import DatabaseConstructor from 'better-sqlite3'

const dbOptions = {}

export const db = new DatabaseConstructor(dbPath, dbOptions)
