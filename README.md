# Hostel Management UI

A React + Vite starter UI for a **hostel management system** with backend endpoint contracts.

## Features

- Configure floors, room numbers, and max persons per room.
- Dashboard for occupancy, available bed count, and monthly payment summary.
- Advanced room search by floor, room type, payment status, wing, min available beds, and max rent.
- Clearly defined endpoint constants and payload previews so backend integration is straightforward.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Backend endpoint contracts used by the UI

`src/api.js` defines all endpoints through `VITE_API_BASE_URL` (default: `http://localhost:8080/api`).

- `GET /dashboard/summary`
- `GET /rooms`
- `GET /payments/monthly-status`
- `POST /floors`
- `POST /rooms/search`

For local UI development, the app falls back to mock data if these endpoints are unavailable.
