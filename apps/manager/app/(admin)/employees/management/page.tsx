"use client"

import { EmployeeFilteredTable } from "@/features/employees"

export default function ManagementStaffPage() {
  return (
    <EmployeeFilteredTable
      departmentFilter="management"
      title="Management Team"
      description="All management department employees"
    />
  )
}
