# Backend Plan

## Responsibilities
- User authentication (register/login)
- Vault CRUD operations
- Encryption before database storage
- Audit logging

## Core Tech
- Node.js + Express
- JWT for auth
- Argon2 for password hashing
- AES-256-GCM for encryption
- PostgreSQL database

## Main Routes
Auth:
- POST /api/auth/register
- POST /api/auth/login

Vault:
- GET /api/vault
- POST /api/vault
- GET /api/vault/:id
- PATCH /api/vault/:id
- DELETE /api/vault/:id
