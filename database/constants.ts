export const dbPath = './sqlite/DB.sqlite'
export const dbRoot = './sqlite/'

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
  activated_at DATE,
  deleted_at DATE,
  permission_level INTEGER DEFAULT 1,
  active INTEGER DEFAULT 0,
  newsletter INTEGER DEFAULT 0
)`

export const sqlInsertUser = `
INSERT INTO Users (email, password, salt, user_id, old_email, newsletter) 
VALUES (@email, @password, @salt, @userId, @userId, @newsletter)`

export const sqlInsertUserWithPermissionLevel = `
INSERT INTO Users (email, password, salt, user_id, permission_level, active) 
VALUES (@email, @password, @salt, @userId, @permissionLevel, 1)`

export const sqlUpdateUserEmail = `
UPDATE Users
SET email = @email
WHERE user_id = @userId
AND deleted_at IS NULL`

export const sqlActivateUser = `
UPDATE Users
SET active = 1
WHERE user_id = @userId
AND deleted_at IS NULL`

export const sqlUpdateUserNewsletter = `
UPDATE Users
SET newsletter = @newsletter
WHERE user_id = @userId
AND deleted_at IS NULL`

export const sqlUpdateUserPassword = `
UPDATE Users
SET password = @password,
    salt = @salt
WHERE user_id = @userId
AND deleted_at IS NULL`

export const sqlRemoveUser = `
UPDATE Users
SET deleted_at = CURRENT_TIMESTAMP
WHERE user_id = @userId
AND deleted_at IS NULL`

export const sqlSelectAllUsers = `
SELECT *
FROM Users
AND deleted_at IS NULL`

export const sqlSelectUser = `
SELECT user_id, email, created_at, permission_level, newsletter, active
FROM Users
WHERE user_id = @userId
AND deleted_at IS NULL`

export const sqlSelectUserByEmail = `
SELECT *
FROM Users
WHERE email = @email
AND deleted_at IS NULL`
