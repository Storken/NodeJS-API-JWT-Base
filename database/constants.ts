export const dbPath = './sqlite/DB.sqlite'
export const dbRoot = './sqlite/'
export const usersDbPath = './api-sqlite/users.sqlite'
export const contractDbPath = './api-sqlite/eth-contracts.sqlite'
export const nullAddress = '0x0000000000000000000000000000000000000000'
export const myAddress = '0x314e5699db4756138107AE7d7EeDDf5708583ff5'
export const contractAddress = '0xBC8D2918fFd0b820257bE8f0F9A3731bb40E3f33' //'0x95D4f220D0E45323E35fa52035c88C8605e2C9d0'

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