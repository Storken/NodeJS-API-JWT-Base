# NodeJS-API-JWT-Base

1. Install packages with `yarn install`
2. Create a .env file with some dummy data with `yarn init-admin`
3. run with nodemon using `yarn serve`


## Base for cookie authenticated user API using JWT and NodeJS
This project is a barebone api built with nodejs for quick and simple integration for your new projects.

Fork it, do whatever you need, it is meant to be a starting point with authentication implemented.

## Authentication
Authentication is done using JWT and slapping that token onto a cookie which we can read during the whole user session.

## Database
Users are stored in an sqlite database in the `/api-sqlite` folder

## Cronjobs
The two cronjobs in use are following:

0 2 * * * /bin/sh /home/dev/linkbun-api/backup.sh
* * * * * /bin/sh /home/dev/linkbun-api/gitpoll.sh
