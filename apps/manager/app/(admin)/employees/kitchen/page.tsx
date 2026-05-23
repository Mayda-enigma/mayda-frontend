"use client"

import { EmployeeFilteredTable } from "@/features/employees"

export default function KitchenStaffPage() {
  return (
    <EmployeeFilteredTable
      departmentFilter="kitchen"
      title="Kitchen Staff"
      description="All kitchen department employees"
    />
  )
}
