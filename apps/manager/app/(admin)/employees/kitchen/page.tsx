"use client"

import { EmployeeFilteredTable } from "@/components/employee-filtered-table"

export default function KitchenStaffPage() {
  return (
    <EmployeeFilteredTable
      departmentFilter="kitchen"
      title="Kitchen Staff"
      description="All kitchen department employees"
    />
  )
}
