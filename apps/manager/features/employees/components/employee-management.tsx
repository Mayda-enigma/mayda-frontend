"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Progress } from "@/shared/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useToast } from "@/shared/ui/use-toast"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  Phone,
  Save,
  Star,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react"
import { useRemoveEmployee, useUpdateEmployee } from "../api/mutations"
import { useEmployees } from "../api/queries"
import { InviteModal } from "./invite-modal"
import type { Employee } from "../types"

const roles = [
  "Head Chef",
  "Sous Chef",
  "Line Cook",
  "Waiter",
  "Bartender",
  "Host",
  "Manager",
  "Dishwasher",
]

const departments = [
  "Kitchen",
  "Service",
  "Bar",
  "Management",
  "Cleaning",
]

type EditFormState = {
  role: string
  isActive: boolean
}

const emptyEditForm: EditFormState = {
  role: "Waiter",
  isActive: true,
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

function getRoleVariant(role: string) {
  if (role === "Head Chef" || role === "Manager") {
    return "default" as const
  }

  if (role === "Sous Chef") {
    return "secondary" as const
  }

  return "outline" as const
}

function getPerformanceColor(rating: number) {
  if (rating >= 4.5) return "text-success"
  if (rating >= 4.0) return "text-warning"
  return "text-destructive"
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  }).format(amount)
}

function getEstimatedShift(role: string, department: string) {
  if (department === "Kitchen") return "09:00-17:00"
  if (department === "Service") return "16:00-23:00"
  if (department === "Bar") return "18:00-02:00"
  if (role === "Manager") return "08:00-18:00"
  return "Not assigned"
}

function toUpdatePayload(form: EditFormState, employee: Employee) {
  const payload: { role?: string; isActive?: boolean } = {}

  if (form.role !== employee.role) payload.role = form.role
  if (form.isActive !== (employee.status === "active")) payload.isActive = form.isActive

  return payload
}

export function EmployeeManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const deferredSearch = useDeferredValue(searchTerm)
  const [filterRole, setFilterRole] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<EditFormState>(emptyEditForm)

  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const employeesQuery = useEmployees({ restaurantId })
  const employees = employeesQuery.data ?? []

  const updateEmployee = useUpdateEmployee(restaurantId ?? 0)
  const removeEmployee = useRemoveEmployee(restaurantId ?? 0)

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase()

    return employees.filter((employee) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.email.toLowerCase().includes(normalizedSearch)
      const matchesRole = filterRole === "all" || employee.role === filterRole
      const matchesDepartment =
        filterDepartment === "all" || employee.department === filterDepartment

      return matchesSearch && matchesRole && matchesDepartment
    })
  }, [deferredSearch, employees, filterDepartment, filterRole])

  const totalEmployees = employees.length
  const activeEmployees = employees.filter((employee) => employee.status === "active").length
  const averageRating =
    totalEmployees > 0
      ? employees.reduce((sum, employee) => sum + employee.performance.rating, 0) /
        totalEmployees
      : 0
  const averageAttendance =
    totalEmployees > 0
      ? employees.reduce(
          (sum, employee) => sum + employee.performance.attendance,
          0,
        ) / totalEmployees
      : 0
  const payroll = employees.reduce((sum, employee) => sum + employee.salary, 0)

  const beginEditing = (employee: Employee) => {
    setEditingEmployeeId(employee.id)
    setEditForm({
      role: employee.role,
      isActive: employee.status === "active",
    })
  }

  const cancelEditing = () => {
    setEditingEmployeeId(null)
    setEditForm(emptyEditForm)
  }

  const saveEmployee = async (employee: Employee) => {
    if (restaurantId === null) {
      return
    }

    const payload = toUpdatePayload(editForm, employee)
    if (Object.keys(payload).length === 0) {
      cancelEditing()
      return
    }

    try {
      await updateEmployee.mutateAsync({ id: employee.id, data: payload })
      toast({
        title: "Employee updated",
        description: `${employee.name}'s role or status was updated.`,
      })
      cancelEditing()
    } catch {
      toast({
        title: "Update failed",
        description: "The employee record could not be updated.",
        variant: "destructive",
      })
    }
  }

  const deleteEmployee = async (employee: Employee) => {
    if (restaurantId === null) {
      return
    }

    try {
      await removeEmployee.mutateAsync(employee.id)
      toast({
        title: "Employee removed",
        description: `${employee.name} was deleted from the roster.`,
      })
    } catch {
      toast({
        title: "Delete failed",
        description: "The employee could not be removed.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-balance">Employee Management</h1>
          <p className="text-base text-muted-foreground">
            Manage staff records, role assignments, and performance signals.
          </p>
        </div>
        {restaurantId !== null ? (
          <>
            <Button onClick={() => setIsInviteOpen(true)}>
              <UserPlus className="h-4 w-4" />
              Invite Employee
            </Button>
            <InviteModal
              open={isInviteOpen}
              onOpenChange={setIsInviteOpen}
              onSuccess={() => setIsInviteOpen(false)}
              restaurantId={restaurantId}
            />
          </>
        ) : null}
      </div>

      {isUserLoading || employeesQuery.isLoading ? (
        <Alert>
          <AlertTitle>Loading staff roster</AlertTitle>
          <AlertDescription>
            Pulling the latest employee records for this restaurant.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Restaurant context missing</AlertTitle>
          <AlertDescription>
            This manager account is not linked to a restaurant, so employee CRUD is
            unavailable.
          </AlertDescription>
        </Alert>
      ) : null}
      {employeesQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load employees</AlertTitle>
          <AlertDescription>
            The staff API request failed. Refresh the page and try again.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                <Users className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Total Staff</p>
                <div className="text-2xl font-semibold tabular-nums">{totalEmployees}</div>
                <p className="text-xs text-muted-foreground">
                  {activeEmployees} active employees
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-success/15 text-success">
                <Star className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Avg Performance</p>
                <div className="text-2xl font-semibold text-success tabular-nums">
                  {averageRating.toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Across all staff</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-blue/15 text-accent-blue">
                <CheckCircle className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Attendance Rate</p>
                <div className="text-2xl font-semibold tabular-nums">
                  {averageAttendance.toFixed(0)}%
                </div>
                <p className="text-xs text-muted-foreground">Average attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary/15 text-secondary-foreground">
                <DollarSign className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Payroll</p>
                <div className="text-2xl font-semibold tabular-nums">
                  {formatCurrency(payroll)}
                </div>
                <p className="text-xs text-muted-foreground">Annual total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="staff">Staff Directory</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Search employees by name or email"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {filteredEmployees.length === 0 && !employeesQuery.isLoading ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  No employees matched the current filters.
                </p>
              </CardContent>
            </Card>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEmployees.map((employee) => {
              const isEditing = editingEmployeeId === employee.id
              const isSaving =
                isEditing &&
                updateEmployee.isPending &&
                updateEmployee.variables?.id === employee.id
              const isDeleting =
                removeEmployee.isPending &&
                removeEmployee.variables === employee.id

              return (
                <Card key={employee.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={employee.avatar ?? "/placeholder.svg"}
                          alt={employee.name}
                        />
                        <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold">{employee.name}</h3>
                        <div className="mt-2">
                          <Badge variant={getRoleVariant(employee.role)}>
                            {employee.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Mail className="mt-0.5 h-3 w-3 text-muted-foreground" />
                        <span className="min-w-0 truncate text-muted-foreground">
                          {employee.email}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {employee.phone || "No phone on file"}
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Department
                          </Label>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{employee.department}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Role</Label>
                          {isEditing ? (
                            <Select
                              value={editForm.role}
                              onValueChange={(role) =>
                                setEditForm((current) => ({ ...current, role }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role} value={role}>
                                    {role}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <p className="text-muted-foreground">{employee.role}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Salary</Label>
                          <p className="text-muted-foreground">
                            {formatCurrency(employee.salary)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Joined
                          </Label>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{employee.hireDate}</span>
                          </div>
                        </div>
                      </div>
                      {isEditing ? (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Active Status
                          </Label>
                          <Select
                            value={editForm.isActive ? "active" : "inactive"}
                            onValueChange={(value) =>
                              setEditForm((current) => ({
                                ...current,
                                isActive: value === "active",
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Performance</span>
                        <div className="flex items-center gap-1">
                          <Star
                            className={`h-3 w-3 ${getPerformanceColor(
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
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Attendance</span>
                        <span className="tabular-nums">
                          {employee.performance.attendance}%
                        </span>
                      </div>
                      <Progress
                        value={employee.performance.attendance}
                        className="mt-2 h-2"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      {isEditing ? (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => saveEmployee(employee)}
                            disabled={isSaving}
                          >
                            <Save className="h-3 w-3" />
                            {isSaving ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={cancelEditing}
                            disabled={isSaving}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => beginEditing(employee)}
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                disabled={isDeleting}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Remove {employee.name} from this restaurant. This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteEmployee(employee)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Employee</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Overall Rating</TableHead>
                      <TableHead>Avg Service Time</TableHead>
                      <TableHead>Customer Score</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={employee.avatar ?? "/placeholder.svg"}
                                alt={employee.name}
                              />
                              <AvatarFallback>
                                {getInitials(employee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleVariant(employee.role)}>
                            {employee.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="tabular-nums">
                          {employee.performance.rating.toFixed(1)}
                        </TableCell>
                        <TableCell>{employee.performance.avgServiceTime}</TableCell>
                        <TableCell className="tabular-nums">
                          {employee.performance.customerScore.toFixed(1)}
                        </TableCell>
                        <TableCell className="tabular-nums">
                          {employee.performance.attendance}%
                        </TableCell>
                        <TableCell>
                          {employee.performance.rating >= 4.5 ? (
                            <Badge variant="success">Excellent</Badge>
                          ) : employee.performance.rating >= 4.0 ? (
                            <Badge variant="warning">Good</Badge>
                          ) : (
                            <Badge variant="destructive">Needs Support</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shift Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Schedule API not wired yet</AlertTitle>
                <AlertDescription>
                  These shift windows are department-based placeholders until the
                  dedicated scheduling endpoint is connected.
                </AlertDescription>
              </Alert>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Estimated Shift</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>
                          {getEstimatedShift(employee.role, employee.department)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {employees.map((employee) => {
                const daysPresent = Math.floor(
                  (employee.performance.attendance / 100) * 22,
                )

                return (
                  <div
                    key={employee.id}
                    className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={employee.avatar ?? "/placeholder.svg"}
                          alt={employee.name}
                        />
                        <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-success tabular-nums">
                          {daysPresent}
                        </p>
                        <p className="text-xs text-muted-foreground">Days Present</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-destructive tabular-nums">
                          {22 - daysPresent}
                        </p>
                        <p className="text-xs text-muted-foreground">Days Absent</p>
                      </div>
                      <div className="min-w-32 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Attendance</span>
                          <span className="tabular-nums">
                            {employee.performance.attendance}%
                          </span>
                        </div>
                        <Progress
                          value={employee.performance.attendance}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
