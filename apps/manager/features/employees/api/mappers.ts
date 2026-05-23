import type { Employee, EmployeeDto, InviteDto, UpdateDto } from '../types';

export const toEmployee = (dto: EmployeeDto): Employee => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  phone: dto.phone,
  role: dto.role,
  department: dto.department,
  hireDate: dto.hireDate,
  salary: dto.salary,
  status: dto.status as Employee['status'],
  avatar: dto.avatar,
  performance: {
    rating: dto.performance_rating,
    avgServiceTime: dto.performance_avg_service_time,
    customerScore: dto.performance_customer_score,
    attendance: dto.performance_attendance,
  },
});

export const toInviteDto = (data: {
  firstName: string;
  lastName: string;
  phone: number;
  email?: string;
  role: string;
}): InviteDto => ({
  firstName: data.firstName,
  lastName: data.lastName,
  phone: data.phone,
  email: data.email || undefined,
  role: data.role,
});

export const toUpdateDto = (data: { role?: string; isActive?: boolean }): UpdateDto => {
  const update: UpdateDto = {};
  if (data.role !== undefined) update.role = data.role;
  if (data.isActive !== undefined) update.isActive = data.isActive;
  return update;
};
