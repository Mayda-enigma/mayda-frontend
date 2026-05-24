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
  email: string | null;
  phone: number;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  restaurantId: number | null;
}

export interface InviteDto {
  firstName: string;
  lastName: string;
  phone: number;
  email?: string;
  role: string;
}

export interface UpdateDto {
  role?: string;
  isActive?: boolean;
}

export interface EmployeesQueryParams {
  restaurantId: number | null;
}
