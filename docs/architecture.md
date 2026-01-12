# SecureVault Architecture

## Overview
SecureVault is a secure full-stack web application for storing sensitive notes in an encrypted vault.

## Tech Stack
- Frontend: React + TypeScript  
- Backend: Node.js + Express  
- Database: PostgreSQL  

## Architecture
React communicates with an Express API over HTTPS. The API handles authentication, authorization, encryption, and data access before storing encrypted data in PostgreSQL.

## Components
- **Frontend (client/):** Auth UI, vault dashboard, secure API requests using JWT  
- **Backend (server/):** REST API, JWT auth, input validation, encryption at rest, audit logging, rate limiting  
- **Database:**  
  - `users` (auth data)  
  - `vault_items` (encrypted secrets)  
  - `audit_logs` (security events)

## Security
- Password hashing with Argon2  
- JWT-based authentication (short-lived tokens)  
- AES-256-GCM encryption at rest  
- HTTPS in production  
- Server-side validation, secure headers, rate limiting  
- Audit logging for vault actions

## Core API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/vault`
- `POST /api/vault`
- `GET /api/vault/:id`
- `PATCH /api/vault/:id`
- `DELETE /api/vault/:id`
