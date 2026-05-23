"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Star, Mail, Phone, MapPin } from "lucide-react"

const employees = [
  { id: 1, name: "Alice Johnson", role: "Head Chef", department: "Kitchen", email: "alice@restaurant.com", phone: "+1 234-567-8900", rating: 4.8, attendance: 96 },
  { id: 2, name: "Bob Smith", role: "Waiter", department: "Service", email: "bob@restaurant.com", phone: "+1 234-567-8901", rating: 4.5, attendance: 92 },
  { id: 3, name: "Carol Davis", role: "Sous Chef", department: "Kitchen", email: "carol@restaurant.com", phone: "+1 234-567-8902", rating: 4.7, attendance: 94 },
  { id: 4, name: "David Wilson", role: "Bartender", department: "Bar", email: "david@restaurant.com", phone: "+1 234-567-8903", rating: 4.6, attendance: 89 },
  { id: 5, name: "Emma Brown", role: "Manager", department: "Management", email: "emma@restaurant.com", phone: "+1 234-567-8904", rating: 4.9, attendance: 98 },
]

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("")

const getPerformanceColor = (rating: number) => {
  if (rating >= 4.5) return "text-success"
  if (rating >= 4.0) return "text-warning"
  return "text-destructive"
}

interface EmployeeFilteredTableProps {
  departmentFilter?: string
  title: string
  description: string
}

export function EmployeeFilteredTable({ departmentFilter, title, description }: EmployeeFilteredTableProps) {
  const filtered = departmentFilter
    ? employees.filter((e) => e.department.toLowerCase() === departmentFilter.toLowerCase())
    : employees

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{initials(employee.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{employee.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {employee.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-xs">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {employee.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className={`h-4 w-4 ${getPerformanceColor(employee.rating)}`} />
                      <span className={getPerformanceColor(employee.rating)}>{employee.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{employee.attendance}%</span>
                      </div>
                      <Progress value={employee.attendance} className="h-2" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
