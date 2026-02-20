import { Allocation, Complaint, DashboardSummary, FeeRecord, Room, Student } from '@/types';

export const mockSummary: DashboardSummary = {
  totalStudents: 248,
  roomsAvailable: 34,
  pendingFeesAmount: 128500,
  openComplaints: 12,
  occupancyPercent: 78,
  monthlyRevenue: 842000,
};

export const mockStudents: Student[] = [
  { id: 's1', registrationNo: 'REG001', name: 'Aarav Singh', email: 'aarav@mail.com', phone: '9876543210', status: 'ACTIVE', hostelName: 'A Block', roomNumber: '101', bedNumber: 'B1' },
  { id: 's2', registrationNo: 'REG002', name: 'Neha Patel', email: 'neha@mail.com', phone: '9087654321', status: 'ACTIVE', hostelName: 'B Block', roomNumber: '205', bedNumber: 'B2' },
];

export const mockRooms: Room[] = [
  { id: 'r1', hostelName: 'A Block', floor: 1, roomNumber: '101', capacity: 4, occupiedBeds: 3, status: 'AVAILABLE' },
  { id: 'r2', hostelName: 'A Block', floor: 2, roomNumber: '205', capacity: 2, occupiedBeds: 2, status: 'FULL' },
  { id: 'r3', hostelName: 'B Block', floor: 3, roomNumber: '307', capacity: 3, occupiedBeds: 1, status: 'AVAILABLE' },
];

export const mockAllocations: Allocation[] = [
  { id: 'a1', studentName: 'Aarav Singh', hostelName: 'A Block', roomNumber: '101', bedNumber: 'B1', status: 'ALLOCATED', allocatedOn: '2026-02-01' },
  { id: 'a2', studentName: 'Neha Patel', hostelName: 'B Block', roomNumber: '307', bedNumber: 'B2', status: 'TRANSFERRED', allocatedOn: '2026-01-15' },
];

export const mockFees: FeeRecord[] = [
  { id: 'f1', studentName: 'Aarav Singh', amount: 5500, dueDate: '2026-03-05', status: 'PENDING' },
  { id: 'f2', studentName: 'Neha Patel', amount: 5500, dueDate: '2026-03-05', status: 'PAID' },
];

export const mockComplaints: Complaint[] = [
  { id: 'c1', studentName: 'Aarav Singh', category: 'Maintenance', description: 'Fan not working', status: 'OPEN' },
  { id: 'c2', studentName: 'Neha Patel', category: 'Mess', description: 'Food quality issue', status: 'IN_PROGRESS' },
];
