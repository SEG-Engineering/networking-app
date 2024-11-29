# Project Overview
Building a networking contact management application that allows tracking and managing professional contacts.

# Current Infrastructure
- AWS Services:
  - RDS (PostgreSQL)
  - EC2 jumpbox for RDS access
  - AWS Amplify
  - IAM
  - S3

# Database Schema Implemented
Successfully created and tested PostgreSQL schema with tables:
- contacts (main contact information)
- phone_numbers (multiple numbers per contact)
- social_profiles (multiple profiles per contact)
- relationships (relationship management)
- tracking (meeting and follow-up data)

# Connection Details
1. RDS Database:
- Host: networking-app-db.cveokqaoony7.us-east-1.rds.amazonaws.com
- Database: networking_app
- Username: admin_db
- Password: broaddaylight
- Port: 5432

2. EC2 Jumpbox:
- IP: 54.158.106.82
- SSH Key: BastionHost2Proper.pem
- User: ec2-user

# Current Codebase
GitHub Repository: https://github.com/SEG-Engineering/networking-app

# Last Completed Tasks
1. Set up database schema
2. Tested data relationships with sample contact:
   - Multiple phone numbers
   - Multiple social profiles
   - Relationship data
   - Tracking information
3. Verified all relationships working correctly

# Current Position
Ready to implement API endpoints for:
- CRUD operations
- Data validation
- Error handling
- Frontend integration

# Next Steps
1. Implement API routes
2. Set up data validation
3. Create error handling middleware
4. Update frontend components

# Testing Data
Sample contact in database:
- ID: 8002ddd3-2303-4a25-84c2-c716217fb8bf
- Name: John Doe
- Email: john@techcorp.com
- With related phone numbers, social profiles, and tracking data

# Critical Information for Development
1. Database access requires SSH tunnel through jumpbox
2. All database operations verified working through tunnel
3. Schema includes proper relationships and constraints