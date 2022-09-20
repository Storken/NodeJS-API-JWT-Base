export const dbPath = './sqlite/DB.sqlite'
export const dbRoot = './sqlite/'
export const contractDbPath = './api-sqlite/eth-contracts.sqlite'

/**
 * Users queries
 */

export const sqlCreateUsersTable = `
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT UNIQUE,
  email TEXT NOT NULL,
  password TEXT NOT NULL,             
  salt TEXT NOT NULL,    
  created_at DATE DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATE,
  permission_level INTEGER DEFAULT 1
)`

export const sqlInsertUser = `
INSERT INTO Users (email, password, salt, user_id) 
VALUES (@email, @password, @salt, @user_id)`

export const sqlInsertUserWithPermissionLevel = `
INSERT INTO Users (email, password, salt, user_id, permission_level) 
VALUES (@email, @password, @salt, @user_id, @permission_level)`

export const sqlUpdateUser = `
UPDATE Users
SET email = @email,
    password = @password
WHERE user_id = @userId`

export const sqlRemoveUser = `
UPDATE Users
SET email = '',
  deleted_at = CURRENT_TIMESTAMP
WHERE user_id = @userId`

export const sqlSelectAllUsers = `
SELECT *
FROM Users`

export const sqlSelectUser = `
SELECT *
FROM Users
WHERE user_id = @userId`

export const sqlSelectUserByEmail = `
SELECT *
FROM Users
WHERE email = @email`
