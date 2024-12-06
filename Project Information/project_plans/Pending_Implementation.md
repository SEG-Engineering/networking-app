/api/auth/login
- Purpose: User authentication
- Method: POST
- Required: email, password

/api/auth/verify-email
- Purpose: Email verification
- Method: GET
- Required: verification token

/api/auth/reset-password
- Purpose: Password reset
- Method: POST
- Required: email for request, new password for reset

/api/contacts/*
- Various endpoints for contact management
- CRUD operations for contacts