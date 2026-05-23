"use client"

import { EmployeeFilteredTable } from "@/components/employee-filtered-table"

export default function ManagementStaffPage() {
  return (
    <EmployeeFilteredTable
      departmentFilter="management"
      title="Management Team"
      description="All management department employees"
    />
  )
}
