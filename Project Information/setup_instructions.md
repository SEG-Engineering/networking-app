Setup Instructions
1. Environment Setup
Required software:

Node.js (v18 or higher)
PostgreSQL database
npm or yarn package manager

2. Environment Variables
Create a .env file with:
envCopy# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name

# Authentication
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# Email Configuration (pending)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password
EMAIL_FROM=noreply@example.com
3. Database Setup

Install dependencies:

bashCopynpm install

Generate Prisma client:

bashCopynpx prisma generate

Run migrations:

bashCopynpx prisma migrate dev
Testing Instructions
Authentication Testing
Test registration endpoint:
bashCopycurl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "Password123!",
  "name": "Test User"
}'
Expected successful response:
jsonCopy{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "test@example.com",
      "name": "Test User"
    },
    "token": "jwt_token"
  }
}