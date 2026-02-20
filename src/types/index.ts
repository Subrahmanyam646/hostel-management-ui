export type UserRole = 'ADMIN' | 'WARDEN' | 'STUDENT';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: AuthUser;
}

export interface DashboardSummary {
  totalStudents: number;
  roomsAvailable: number;
  pendingFeesAmount: number;
  openComplaints: number;
  occupancyPercent: number;
  monthlyRevenue: number;
}

export interface Student {
  id: string;
  registrationNo: string;
  name: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'VACATED';
  hostelName?: string;
  roomNumber?: string;
  bedNumber?: string;
}

export interface Room {
  id: string;
  hostelName: string;
  floor: number;
  roomNumber: string;
  capacity: number;
  occupiedBeds: number;
  status: 'AVAILABLE' | 'FULL' | 'MAINTENANCE';
}

export interface Allocation {
  id: string;
  studentName: string;
  hostelName: string;
  roomNumber: string;
  bedNumber: string;
  status: 'ALLOCATED' | 'TRANSFERRED' | 'VACATED';
  allocatedOn: string;
}

export interface FeeRecord {
  id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'PARTIAL';
}

export interface Complaint {
  id: string;
  studentName: string;
  category: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
}
