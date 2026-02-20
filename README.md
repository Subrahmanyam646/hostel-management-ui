# Hostel Management System Frontend (React + TypeScript)

Production-ready frontend scaffold for integrating with a Spring Boot backend.

## Tech Stack

- React + Vite + TypeScript
- React Router v6
- Axios API service layer
- Zustand for auth/UI state
- Tailwind CSS (dark/light mode)
- React Hook Form + Yup validation
- JWT token handling via Axios interceptors

## Folder Structure

```text
src/
  components/
    common/
    layout/
    ui/
  features/
    auth/
  hooks/
  pages/
    auth/
    dashboard/
    students/
    hostels/
    allocations/
    fees/
    complaints/
  router/
  services/
  store/
  types/
  utils/
```

## Core Pages Included

1. Authentication
   - Login + Register forms
   - JWT store/hydrate/logout
   - Role-aware protected routes
2. Dashboard
   - Summary cards + occupancy/revenue chart widgets
3. Student Management
   - Student list, search, pagination
   - Add/Edit student form
   - Student profile + allocate room action
4. Hostel & Room Management
   - Hostel list with floor → room → bed availability visualization
5. Allocation Management
   - Allocate, transfer, vacate actions
   - Allocation history table
6. Fees Management
   - Fee list, payment trigger, invoice API trigger, pending dues filter
7. Complaint Management
   - Raise complaint form
   - Complaint list + status update

## API Endpoints expected from Spring Boot

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`
- `GET /dashboard/summary`
- `GET /students`
- `GET /students/{id}`
- `POST /students`
- `POST /students/{id}/allocate`
- `GET /rooms`
- `POST /rooms`
- `GET /allocations`
- `POST /allocations/allocate`
- `POST /allocations/transfer`
- `POST /allocations/{id}/vacate`
- `GET /fees`
- `POST /fees/pay`
- `GET /fees/{id}/invoice`
- `GET /complaints`
- `POST /complaints`
- `PATCH /complaints/{id}/status`

> All endpoints are prefixed by `VITE_API_URL` (default: `http://localhost:8080/api`).

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Build & Quality

```bash
npm run typecheck
npm run lint
npm run build
```
