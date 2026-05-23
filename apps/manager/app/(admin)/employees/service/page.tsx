"use client"

import { EmployeeFilteredTable } from "@/features/employees"

export default function ServiceStaffPage() {
  return (
    <EmployeeFilteredTable
      departmentFilter="service"
      title="Service Staff"
      description="All service department employees"
    />
  )
}
