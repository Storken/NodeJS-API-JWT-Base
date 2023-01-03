cd /home/dev/png-api
docker compose cp api:/usr/src/app/sqlite/DB.sqlite /home/dev/sqlite/png-api/backup/DB-$(date +%Y%m%d_%H%M%S).sqlite