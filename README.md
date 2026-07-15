# Enterprise Invoice Management System

Backend foundation for an enterprise-style invoice workflow system built with Java, Spring Boot, Spring Security, JWT, Hibernate, MySQL, and REST APIs.

## Current Phase

Phase 1 backend foundation has started with:

- Spring Boot project setup
- MySQL datasource configuration
- User entity and role enum
- JWT authentication
- Role-based authorization
- Admin-only user management APIs
- Vendor management APIs
- Invoice CRUD APIs
- Approval workflow engine
- Audit logging
- Payment tracking
- Dashboard summary API
- Swagger UI documentation

## Tech Stack

- Java 17
- Spring Boot 3.5.14
- Spring Security
- Spring Data JPA
- MySQL
- Maven
- JWT with JJWT
- React
- Tailwind CSS
- Axios
- React Router
- Recharts
- Docker Compose for local MySQL

## Roles

- `ADMIN`
- `FINANCE_EXECUTIVE`
- `MANAGER`
- `VENDOR`

## Run Locally

Install Java 17 and Maven first.

Start MySQL:

```powershell
docker compose up -d
```

Run the backend:

```powershell
mvn spring-boot:run
```

The API runs at:

```text
http://localhost:8080
```

Run the frontend:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://127.0.0.1:5173
```

## Environment Variables

Defaults are set for local development, but you can override them:

```text
DB_URL=jdbc:mysql://localhost:3306/invoice_management_system?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=root
JWT_SECRET=change-this-development-secret-key-change-this-development-secret-key
JWT_EXPIRATION_MS=86400000
```

Use a stronger `JWT_SECRET` before deploying.

## Auth APIs

Register:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "ADMIN"
}
```

Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

Use the returned token for secured APIs:

```http
Authorization: Bearer <token>
```

## User APIs

These require an `ADMIN` token.

```http
POST /api/users
GET /api/users
PUT /api/users/{id}
DELETE /api/users/{id}
```

## Vendor APIs

```http
POST /api/vendors
GET /api/vendors
GET /api/vendors/{id}
PUT /api/vendors/{id}
DELETE /api/vendors/{id}
```

Vendor validation includes Indian GSTIN and PAN formats.

## Invoice APIs

```http
POST /api/invoices
GET /api/invoices
GET /api/invoices/{id}
PUT /api/invoices/{id}
DELETE /api/invoices/{id}
```

Invoice status lifecycle:

```text
UPLOADED -> UNDER_REVIEW -> APPROVED -> PAID
UPLOADED -> UNDER_REVIEW -> REJECTED
```

Invalid transitions, such as `REJECTED -> PAID`, are rejected.

## Workflow APIs

Finance review:

```http
PUT /api/invoices/{id}/review
Content-Type: application/json

{
  "remarks": "GST and invoice amount validated"
}
```

Manager approval:

```http
PUT /api/invoices/{id}/approve
Content-Type: application/json

{
  "remarks": "Approved for payment"
}
```

Manager rejection:

```http
PUT /api/invoices/{id}/reject
Content-Type: application/json

{
  "remarks": "GST amount mismatch"
}
```

Payment completion:

```http
PUT /api/invoices/{id}/payment
Content-Type: application/json

{
  "amount": 11800.00,
  "paymentReference": "UTR123456789",
  "paymentDate": "2026-05-26"
}
```

Approval history:

```http
GET /api/invoices/{invoiceId}/approvals
```

Audit logs:

```http
GET /api/audit-logs/Invoice/{invoiceId}
```

Dashboard:

```http
GET /api/dashboard/summary
```

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

## Frontend Features

- JWT login and registration
- Protected routes
- Role-based navigation
- SaaS-style dashboard cards
- Invoice status pie chart
- Monthly invoice trend chart
- Vendor invoice upload and status tracking
- Finance review queue
- Manager approve/reject queue
- Invoice details page with PDF link, approval history, timeline, payment action, and audit logs
- Responsive desktop and mobile layouts

## Next Build Steps

1. Add real multipart PDF upload or S3 storage.
2. Add backend pagination and frontend table pagination.
3. Add report exports for Excel/PDF.
4. Add email notifications for approval/rejection/payment events.
5. Add Redis caching for dashboard and vendor lists.
