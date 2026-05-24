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
  return new Intl.NumberFormat("fr-DZ", {
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
  return "Non attribué"
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
          <h1 className="text-3xl font-semibold text-balance">Gestion du personnel</h1>
          <p className="text-base text-muted-foreground">
            Gérez les fiches du personnel, les affectations et les indicateurs de performance.
          </p>
        </div>
        {restaurantId !== null ? (
          <>
            <Button onClick={() => setIsInviteOpen(true)}>
              <UserPlus className="h-4 w-4" />
              Inviter un employé
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
          <AlertTitle>Chargement du personnel</AlertTitle>
          <AlertDescription>
            Chargement des dernières fiches du personnel de ce restaurant.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Contexte du restaurant manquant</AlertTitle>
          <AlertDescription>
            Ce compte manager n'est pas lié à un restaurant.
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                <Users className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Effectif total</p>
                <div className="text-2xl font-semibold tabular-nums">{totalEmployees}</div>
                <p className="text-xs text-muted-foreground">
                  {activeEmployees} employés actifs
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
                <p className="text-xs font-medium text-muted-foreground">Performance moy.</p>
                <div className="text-2xl font-semibold text-success tabular-nums">
                  {averageRating.toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Moyenne générale</p>
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
                <p className="text-xs font-medium text-muted-foreground">Taux de présence</p>
                <div className="text-2xl font-semibold tabular-nums">
                  {averageAttendance.toFixed(0)}%
                </div>
                <p className="text-xs text-muted-foreground">Moyenne de présence</p>
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
                <p className="text-xs font-medium text-muted-foreground">Masse salariale</p>
                <div className="text-2xl font-semibold tabular-nums">
                  {formatCurrency(payroll)}
                </div>
                <p className="text-xs text-muted-foreground">Total annuel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="staff">Annuaire du personnel</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="schedule">Planning</TabsTrigger>
          <TabsTrigger value="attendance">Présence</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher par nom ou email"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Département" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les départements</SelectItem>
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
                  Aucun employé ne correspond aux filtres.
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
                          {employee.phone || "Aucun téléphone"}
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Département
                          </Label>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{employee.department}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Rôle</Label>
                          {isEditing ? (
                            <Select
                              value={editForm.role}
                              onValueChange={(role) =>
                                setEditForm((current) => ({ ...current, role }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Rôle" />
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
                          <Label className="text-xs text-muted-foreground">Salaire</Label>
                          <p className="text-muted-foreground">
                            {formatCurrency(employee.salary)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Arrivée
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
                            Statut
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
                              <SelectItem value="active">Actif</SelectItem>
                              <SelectItem value="inactive">Inactif</SelectItem>
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
                        <span className="text-muted-foreground">Présence</span>
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
                            {isSaving ? "Enregistrement..." : "Enregistrer"}
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
                            Modifier
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
                                <AlertDialogTitle>Supprimer l'employé</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Supprimer {employee.name} de ce restaurant. Cette
                                  action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteEmployee(employee)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {isDeleting ? "Suppression..." : "Supprimer"}
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
              <CardTitle>Métriques de performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Employé</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Note globale</TableHead>
                      <TableHead>Temps de service moy.</TableHead>
                      <TableHead>Score client</TableHead>
                      <TableHead>Présence</TableHead>
                      <TableHead>Statut</TableHead>
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
                            <Badge variant="warning">Bon</Badge>
                          ) : (
                            <Badge variant="destructive">Soutien nécessaire</Badge>
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
              <CardTitle>Couverture des quarts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>API de planning non connectée</AlertTitle>
                <AlertDescription>
                  Ces créneaux sont des placeholders basés sur le département en
                  attendant la connexion de l'API dédiée.
                </AlertDescription>
              </Alert>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employé</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Créneau estimé</TableHead>
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
              <CardTitle>Suivi des présences</CardTitle>
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
                        <p className="text-xs text-muted-foreground">Jours présents</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-destructive tabular-nums">
                          {22 - daysPresent}
                        </p>
                        <p className="text-xs text-muted-foreground">Jours absents</p>
                      </div>
                      <div className="min-w-32 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Présence</span>
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
