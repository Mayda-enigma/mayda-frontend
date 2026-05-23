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

export const toInviteDto = (data: { email: string; role: string; department: string }): InviteDto => ({
  email: data.email,
  role: data.role,
  department: data.department,
});

export const toUpdateDto = (data: Partial<Employee>): UpdateDto => {
  const update: UpdateDto = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.email !== undefined) update.email = data.email;
  if (data.phone !== undefined) update.phone = data.phone;
  if (data.role !== undefined) update.role = data.role;
  if (data.department !== undefined) update.department = data.department;
  if (data.salary !== undefined) update.salary = data.salary;
  return update;
};
