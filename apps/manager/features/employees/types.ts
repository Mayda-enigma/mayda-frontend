export type EmployeeStatus = 'active' | 'inactive' | 'pending';

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hireDate: string;
  salary: number;
  status: EmployeeStatus;
  avatar: string | null;
  performance: {
    rating: number;
    avgServiceTime: string;
    customerScore: number;
    attendance: number;
  };
}

export interface EmployeeDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hireDate: string;
  salary: number;
  status: string;
  avatar: string | null;
  performance_rating: number;
  performance_avg_service_time: string;
  performance_customer_score: number;
  performance_attendance: number;
}

export interface InviteDto {
  email: string;
  role: string;
  department: string;
}

export interface UpdateDto {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
  salary?: number;
}

export interface EmployeesQueryParams {
  restaurantId: number | null;
}
