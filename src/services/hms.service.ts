import { Allocation, Complaint, DashboardSummary, FeeRecord, Room, Student } from '@/types';
import { http } from './http';
import { mockAllocations, mockComplaints, mockFees, mockRooms, mockStudents, mockSummary } from './mockData';

const withFallback = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};

export const hmsService = {
  getDashboardSummary: () => withFallback(async () => (await http.get<DashboardSummary>('/dashboard/summary')).data, mockSummary),
  getStudents: () => withFallback(async () => (await http.get<Student[]>('/students')).data, mockStudents),
  getStudentById: (id: string) => withFallback(async () => (await http.get<Student>(`/students/${id}`)).data, mockStudents[0]),
  saveStudent: (payload: Partial<Student>) => http.post('/students', payload),
  allocateStudentRoom: (studentId: string, roomId: string, bedNumber: string) => http.post(`/students/${studentId}/allocate`, { roomId, bedNumber }),

  getRooms: () => withFallback(async () => (await http.get<Room[]>('/rooms')).data, mockRooms),
  saveRoom: (payload: Partial<Room>) => http.post('/rooms', payload),

  getAllocations: () => withFallback(async () => (await http.get<Allocation[]>('/allocations')).data, mockAllocations),
  allocateBed: (payload: { studentId: string; roomId: string; bedNumber: string }) => http.post('/allocations/allocate', payload),
  transferRoom: (payload: { allocationId: string; toRoomId: string; toBedNumber: string }) => http.post('/allocations/transfer', payload),
  vacateRoom: (allocationId: string) => http.post(`/allocations/${allocationId}/vacate`),

  getFees: () => withFallback(async () => (await http.get<FeeRecord[]>('/fees')).data, mockFees),
  payFee: (payload: { feeId: string; amount: number; mode: string }) => http.post('/fees/pay', payload),
  getInvoice: (feeId: string) => http.get(`/fees/${feeId}/invoice`),

  getComplaints: () => withFallback(async () => (await http.get<Complaint[]>('/complaints')).data, mockComplaints),
  raiseComplaint: (payload: { category: string; description: string }) => http.post('/complaints', payload),
  updateComplaintStatus: (id: string, status: Complaint['status']) => http.patch(`/complaints/${id}/status`, { status }),
};
