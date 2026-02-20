import { hostelSummary, monthlyPayments, rooms } from './data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const endpoints = {
  summary: `${API_BASE_URL}/dashboard/summary`,
  floors: `${API_BASE_URL}/floors`,
  rooms: `${API_BASE_URL}/rooms`,
  monthlyPayments: `${API_BASE_URL}/payments/monthly-status`,
  advancedRoomSearch: `${API_BASE_URL}/rooms/search`,
};

async function withFallback(url, fallback) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch {
    return fallback;
  }
}

export function fetchDashboardSummary() {
  return withFallback(endpoints.summary, hostelSummary);
}

export function fetchRooms() {
  return withFallback(endpoints.rooms, rooms);
}

export function fetchMonthlyPayments() {
  return withFallback(endpoints.monthlyPayments, monthlyPayments);
}

export async function configureFloorsAndRooms(payload) {
  return {
    endpoint: endpoints.floors,
    method: 'POST',
    payload,
    note: 'Connect this payload to your backend to persist floor/room settings.',
  };
}

export async function searchRoomsAdvanced(filters) {
  return {
    endpoint: endpoints.advancedRoomSearch,
    method: 'POST',
    filters,
    note: 'Use this payload to implement backend advanced room filtering.',
  };
}
