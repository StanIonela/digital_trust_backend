# Digital Trust task

### Launch (UNIX)

1. Create database in PostgreSQL named 'digital_trust'
```
sudo -i -u postgres
psql
CREATE DATABASE digital_trust;
```
2. Ensure the password for user 'postgres' is 'admin' or change .env file.
.env:3:
```
DB_URI=postgres://postgres:SET_YOUR_PASSWORD@localhost:5432/digital_trust
```

3. Ensure your postgres systemd unit is running
```
sudo systemctl start postgres.service
```

4. Run the app under this folder!
```
node app.js
```

### Launch (Windows)

1. Create database in PgAdmin named 'digital_trust'

2. Ensure the password for user 'postgres' is 'admin' or change .env file.
.env:3:
```
DB_URI=postgres://postgres:SET_YOUR_PASSWORD@localhost:5432/digital_trust
```

3. Run the app under this folder!
```
node app.js
```
