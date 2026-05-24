import type { Employee, EmployeeDto, InviteDto, UpdateDto } from '../types';

function roleToDepartment(role: string): string {
  if (role === "CHEF") return "Kitchen"
  if (role === "WAITER") return "Service"
  if (role === "MANAGER") return "Management"
  if (role === "ADMIN") return "Management"
  return "Service"
}

function roleToDisplay(role: string): string {
  if (role === "CHEF") return "Chef"
  if (role === "WAITER") return "Waiter"
  if (role === "MANAGER") return "Manager"
  if (role === "ADMIN") return "Admin"
  return role
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export const toEmployee = (dto: EmployeeDto): Employee => ({
  id: dto.id,
  name: `${dto.firstName} ${dto.lastName}`,
  email: dto.email ?? "",
  phone: String(dto.phone),
  role: roleToDisplay(dto.role),
  department: roleToDepartment(dto.role),
  hireDate: formatDate(dto.createdAt),
  salary: 0,
  status: dto.isActive ? "active" : "inactive",
  avatar: null,
  performance: {
    rating: 0,
    avgServiceTime: "--",
    customerScore: 0,
    attendance: 0,
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
