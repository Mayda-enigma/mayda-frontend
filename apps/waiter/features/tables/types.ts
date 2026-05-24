export type TableStatus = 'AVAILABLE' | 'OCCUPIED';

export interface CurrentSession {
  sessionId: number;
  waiterId: number;
  waiterName: string;
  startedAt: string;
}

export interface Table {
  id: number;
  number: string;
  capacity: number;
  isActive: boolean;
  status: TableStatus;
  qrCode: string | null;
  currentSession: CurrentSession | null;
  activeOrdersCount: number;
}

export interface TableDto {
  id: number;
  number: string;
  capacity: number;
  isActive: boolean;
  status: string;
  qrCode: string | null;
  currentSession: CurrentSession | null;
  activeOrdersCount: number;
}
