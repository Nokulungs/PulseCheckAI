export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN'
}

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  company: string;
  companyLocation: UserLocation;
  name: string;
  role: UserRole;
  startDate: string;
  reliabilityScore: number;
  accruedLeave: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: 'SICK' | 'ANNUAL' | 'EMERGENCY';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  evidenceUrl?: string;
  evidenceData?: {
    doctorName: string;
    practiceNumber: string;
    dateOnNote: string;
    isFlagged: boolean;
    aiConfidence: number;
  };
}

export interface SickNoteAnalysis {
  doctorName: string;
  practiceNumber: string;
  dateOnNote: string;
  isFlagged: boolean;
}

export interface NLPCoachResponse {
  isEmergency: boolean;
  suggestion: string;
  rating: 'Professional' | 'Unprofessional' | 'Borderline';
}

export type Tab = 'DASHBOARD' | 'ATTENDANCE' | 'LEAVE' | 'CONDUCT' | 'LEAVE_MGMT';
