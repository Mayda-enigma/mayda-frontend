"use client"

import { useMemo } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Progress } from "@/shared/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { AlertCircle, Mail, MapPin, Phone, Star } from "lucide-react"
import { useEmployees } from "../api/queries"

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")

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

export function EmployeeFilteredTable({
  departmentFilter,
  title,
  description,
}: EmployeeFilteredTableProps) {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const employeesQuery = useEmployees({ restaurantId })

  const filteredEmployees = useMemo(() => {
    const employees = employeesQuery.data ?? []
    if (!departmentFilter) {
      return employees
    }

    return employees.filter(
      (employee) =>
        employee.department.toLowerCase() === departmentFilter.toLowerCase(),
    )
  }, [departmentFilter, employeesQuery.data])

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isUserLoading || employeesQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">Chargement des employés...</p>
          ) : null}
          {!isUserLoading && restaurantId === null ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Contexte du restaurant manquant</AlertTitle>
              <AlertDescription>
                Le compte manager actuel n'est pas lié à un restaurant.
              </AlertDescription>
            </Alert>
          ) : null}
          {employeesQuery.isError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Impossible de charger les employés</AlertTitle>
              <AlertDescription>
                La requête a échoué. Actualisez la page et réessayez.
              </AlertDescription>
            </Alert>
          ) : null}
          {!employeesQuery.isLoading &&
          !employeesQuery.isError &&
          restaurantId !== null ? (
            filteredEmployees.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Présence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {initials(employee.name)}
                            </AvatarFallback>
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
                            {employee.phone || "Aucun téléphone"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star
                            className={`h-4 w-4 ${getPerformanceColor(
                              employee.performance.rating,
                            )}`}
                          />
                          <span
                            className={getPerformanceColor(
                              employee.performance.rating,
                            )}
                          >
                            {employee.performance.rating.toFixed(1)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{employee.performance.attendance}%</span>
                          </div>
                          <Progress
                            value={employee.performance.attendance}
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aucun employé ne correspond à ce département.
              </p>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
