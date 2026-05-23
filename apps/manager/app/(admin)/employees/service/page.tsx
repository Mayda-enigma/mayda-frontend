"use client"

import { EmployeeFilteredTable } from "@/components/employee-filtered-table"

export default function ServiceStaffPage() {
  return (
    <EmployeeFilteredTable
      departmentFilter="service"
      title="Service Staff"
      description="All service department employees"
    />
  )
}
