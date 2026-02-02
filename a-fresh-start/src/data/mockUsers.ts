import { User, UserRole, LeaveRequest } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    email: 'alex@rivers.com',
    password: 'password123',
    company: 'TechFlow Solutions',
    companyLocation: {
      lat: -33.931,
      lng: 18.471,
      address: "123 Innovation Drive, Cape Town"
    },
    name: 'Alex Rivers',
    role: UserRole.EMPLOYEE,
    startDate: '2023-11-15',
    reliabilityScore: 94,
    accruedLeave: 12.5,
  },
  {
    id: '2',
    email: 'admin@techflow.com',
    password: 'admin123',
    company: 'TechFlow Solutions',
    companyLocation: {
      lat: -33.931,
      lng: 18.471,
      address: "123 Innovation Drive, Cape Town"
    },
    name: 'Sarah Admin',
    role: UserRole.ADMIN,
    startDate: '2022-03-10',
    reliabilityScore: 100,
    accruedLeave: 18.75,
  }
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'req-1',
    userId: 'emp-2',
    userName: 'Alice Smith',
    type: 'SICK',
    startDate: '2026-01-23',
    endDate: '2026-01-24',
    reason: 'Persistent fever and cough.',
    status: 'PENDING',
    evidenceData: {
      doctorName: 'Dr. Sarah Green',
      practiceNumber: 'PR-88291',
      dateOnNote: '2026-01-23',
      isFlagged: false,
      aiConfidence: 98
    }
  },
  {
    id: 'req-2',
    userId: 'emp-3',
    userName: 'Bob Johnson',
    type: 'ANNUAL',
    startDate: '2026-02-10',
    endDate: '2026-02-15',
    reason: 'Family vacation.',
    status: 'PENDING',
  },
  {
    id: 'req-3',
    userId: 'emp-4',
    userName: 'Dana White',
    type: 'SICK',
    startDate: '2026-01-20',
    endDate: '2026-01-20',
    reason: 'Food poisoning.',
    status: 'PENDING',
    evidenceData: {
      doctorName: 'Unknown',
      practiceNumber: 'Invalid Format',
      dateOnNote: '2026-01-19',
      isFlagged: true,
      aiConfidence: 45
    }
  }
];
