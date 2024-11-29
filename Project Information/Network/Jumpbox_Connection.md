# Connecting to RDS Database via EC2 Jumpbox

## Prerequisites
- EC2 Jumpbox credentials
- SSH key file (BastionHost2Proper.pem)
- RDS database credentials
- Local PostgreSQL client installed

## Connection Steps

## Pre work: Check connection to ec2: ping 54.158.106.82
I notice in your security group rules screenshot that SSH (port 22) is only allowed from IP 65.113.78.98/32. We need to:

Add your current IP address to the security group rules for SSH access:

In the security group
Add a new inbound rule
Type: SSH
Port: 22
Source: Your current IP address



To find your current IP, you can:

Visit whatismyip.com
Or use this command in terminal:

bashCopycurl ifconfig.me

### 1. Create SSH Tunnel
```bash
ssh -v -i ~/.ssh/BastionHost2Proper.pem ec2-user@54.158.106.82
```
Note: Leave this terminal window open while working with the database

### 2. Check if Port is Already in Use
If you get "Address already in use" error:
```bash
# Check what's using the port
lsof -i :5432

# Kill the process if needed (replace PID with actual process ID)
kill -9 PID
```

### 3. Connect to Database
In a new terminal window:
```bash
psql -h localhost -p 5432 -U admin_db -d networking_app
```
Password: broaddaylight

### 4. Database Connection Details
```
Host: localhost (when using SSH tunnel)
Port: 5432
Database: networking_app
Username: admin_db
Password: broaddaylight
```

### 5. For Prisma/.env Configuration
```
DATABASE_URL="postgresql://admin_db:broaddaylight@localhost:5432/networking_app"
```

## Troubleshooting
1. If tunnel connection fails:
   - Verify EC2 instance is running
   - Check security group rules
   - Ensure SSH key has correct permissions (chmod 400)

2. If database connection fails:
   - Verify SSH tunnel is active
   - Check if port 5432 is available
   - Confirm RDS instance is running

3. Common Commands
```bash
# Check tunnel status
lsof -i :5432

# Test database connection
psql -h localhost -p 5432 -U admin_db -d networking_app

# View database tables
\dt

# Exit psql
\q
```

## Additional Trouble Shooting
1. Verify PostgreSQL is Installed
Ensure PostgreSQL is installed on your system.
Run the following command to check:
bash
Copy code
psql --version
If it's not installed, you can install it:
bash
Copy code
brew install postgresql
2. Start PostgreSQL
If PostgreSQL is installed, it may not be running. Start the PostgreSQL server:

bash
Copy code
brew services start postgresql
Then, check the status:

bash
Copy code
brew services list
3. Verify PostgreSQL Configuration
Check postgresql.conf: Locate the configuration file (postgresql.conf) and verify that the server is listening on the correct address and port:

plaintext
Copy code
listen_addresses = 'localhost'  # Or '*' for all IPs
port = 5432
The file is usually in /usr/local/var/postgres/ or /etc/postgresql/.

Check pg_hba.conf: Ensure the pg_hba.conf file allows connections from your user and host:

plaintext
Copy code
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             admin_db        127.0.0.1/32            md5
host    all             admin_db        ::1/128                 md5
4. Check if PostgreSQL is Running
Use the lsof command to see if PostgreSQL is running on port 5432:

bash
Copy code
lsof -i :5432
If nothing is displayed, the server is not running.

Start the server manually:

bash
Copy code
postgres -D /usr/local/var/postgres
5. Restart PostgreSQL
If the server was running previously but stopped, restart it:

bash
Copy code
brew services restart postgresql
6. Verify Connection
Try connecting again:

bash
Copy code
psql -h localhost -p 5432 -U admin_db -d networking_app
7. Check Logs for Errors
If it still doesn't work, check PostgreSQL logs for errors:

bash
Copy code
tail -f /usr/local/var/log/postgres.log
8. If PostgreSQL is Remote
If your PostgreSQL server is remote, update the psql command with the actual host:

bash
Copy code
psql -h <remote-host-ip> -p 5432 -U admin_db -d networking_app