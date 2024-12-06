# Networking App - Project Documentation

## Overview
The Networking App is a professional contact management system that helps users track, maintain, and nurture their professional relationships. The app provides tools for managing contacts, scheduling follow-ups, and maintaining communication history.

## Current Implementation Status

### 1. Database Structure
Currently implemented in PostgreSQL using Prisma ORM:

#### User Model
- Stores basic user account information
- Fields:
  - id (unique identifier)
  - email (unique email address)
  - password (encrypted)
  - name (user's full name)
  - verification status
  - account creation date
  - last update date

#### Contact Model
- Stores contact information
- Fields:
  - Basic info (name, email, company)
  - Relationship to user
  - Creation and update timestamps
  - Links to related models (phone numbers, social profiles)

### 2. Authentication System
Current implementation:
- JWT (JSON Web Token) based authentication
- Password encryption using bcrypt
- Token storage in HTTP-only cookies
- Basic session management

Working features:
- Token creation and verification
- User registration endpoint structure
- Password hashing

Pending features:
- Complete login system
- Email verification
- Password reset functionality
- Remember me option
- Session timeout handling

### 3. API Endpoints

#### Currently Implemented:
```typescript
/api/auth/register
- Purpose: Create new user accounts
- Method: POST
- Required data: email, password, name
- Returns: User data and authentication token

/api/auth/test-token
- Purpose: Verify JWT functionality
- Method: GET
- Returns: Token verification status