# Project Overview
Building a networking contact management application that allows tracking and managing professional contacts.

# Technical Stack & Infrastructure
- Frontend: React/Next.js
- Backend: Node.js
- Database: PostgreSQL on RDS
- AWS Services: RDS, EC2 jumpbox, Amplify, IAM, S3

# Database Schema Details
```sql
-- Exact schema definitions with constraints
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255),
    company VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- [Additional table definitions...]
```

# Existing Components Structure
```
components/
├── ContactDisplay/
├── ContactForm/
├── Dashboard/
├── DigitalCardImport/
├── EmailTemplates/
├── ImportOptions/
├── Navbar/
├── QRScanner/
└── ui/
```

# Connection Details & Environment Setup
```env
DATABASE_URL="postgresql://admin_db:broaddaylight@localhost:5432/networking_app"
# Note: Requires SSH tunnel for database access
```

SSH Tunnel Command:
```bash
ssh -N -L 5432:networking-app-db.cveokqaoony7.us-east-1.rds.amazonaws.com:5432 -i ~/.ssh/BastionHost2Proper.pem ec2-user@54.158.106.82
```

# Implementation Progress
1. Database Schema:
   - All tables created and relationships verified
   - Test data successfully inserted and queried
   - Foreign key constraints and indexes in place

2. Frontend Components:
   - ContactDisplay component implemented with edit/view modes
   - Form validation structure in place
   - UI components from shadcn/ui integrated

3. Current Test Data:
```typescript
// Sample contact structure with related data
const sampleContact = {
  id: "8002ddd3-2303-4a25-84c2-c716217fb8bf",
  name: "John Doe",
  // ... [complete data structure]
};
```

# Development Requirements
1. Digital Card Import:
   - Support for QR code scanning
   - URL-based import
   - Data parsing requirements

2. Contact Management:
   - Required fields and validation rules
   - Relationship tracking requirements
   - Follow-up system specifications

# Next Implementation Phase
Detailed API endpoint requirements:
```typescript
interface ContactEndpoints {
  list: '/api/contacts' // GET
  create: '/api/contacts' // POST
  get: '/api/contacts/:id' // GET
  update: '/api/contacts/:id' // PUT
  delete: '/api/contacts/:id' // DELETE
}
```

# Known Issues/Constraints
1. Database access requires SSH tunnel
2. Node version compatibility requirements
3. AWS service dependencies

# Previous Decisions & Rationales
1. Schema design choices for handling multiple phone numbers
2. Component structure for contact display/edit
3. Authentication approach (pending implementation)