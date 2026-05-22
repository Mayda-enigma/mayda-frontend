"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "@/components/ui/alert-dialog" // Added alert dialog for delete confirmation
import {
  Users,
  UserPlus,
  Star,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  CheckCircle,
  DollarSign,
  Save,
  X,
} from "lucide-react"

// Mock data for employees
const employees = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@restaurant.com",
    phone: "+1 234-567-8900",
    role: "Head Chef",
    department: "Kitchen",
    hireDate: "2022-03-15",
    salary: 65000,
    status: "active",
    avatar: "/diverse-chef-preparing-food.png",
    performance: {
      rating: 4.8,
      avgServiceTime: "12 min",
      customerScore: 4.9,
      attendance: 96,
    },
    schedule: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "Off",
      sunday: "Off",
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@restaurant.com",
    phone: "+1 234-567-8901",
    role: "Waiter",
    department: "Service",
    hireDate: "2023-01-20",
    salary: 35000,
    status: "active",
    avatar: "/waiter-serving.png",
    performance: {
      rating: 4.5,
      avgServiceTime: "8 min",
      customerScore: 4.6,
      attendance: 92,
    },
    schedule: {
      monday: "17:00-23:00",
      tuesday: "17:00-23:00",
      wednesday: "Off",
      thursday: "17:00-23:00",
      friday: "17:00-23:00",
      saturday: "17:00-23:00",
      sunday: "17:00-23:00",
    },
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@restaurant.com",
    phone: "+1 234-567-8902",
    role: "Sous Chef",
    department: "Kitchen",
    hireDate: "2022-08-10",
    salary: 48000,
    status: "active",
    avatar: "/sous-chef.jpg",
    performance: {
      rating: 4.7,
      avgServiceTime: "14 min",
      customerScore: 4.8,
      attendance: 94,
    },
    schedule: {
      monday: "14:00-22:00",
      tuesday: "14:00-22:00",
      wednesday: "14:00-22:00",
      thursday: "Off",
      friday: "14:00-22:00",
      saturday: "14:00-22:00",
      sunday: "14:00-22:00",
    },
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@restaurant.com",
    phone: "+1 234-567-8903",
    role: "Bartender",
    department: "Bar",
    hireDate: "2023-05-12",
    salary: 42000,
    status: "active",
    avatar: "/bartender-mixing-cocktail.png",
    performance: {
      rating: 4.6,
      avgServiceTime: "5 min",
      customerScore: 4.7,
      attendance: 89,
    },
    schedule: {
      monday: "Off",
      tuesday: "18:00-02:00",
      wednesday: "18:00-02:00",
      thursday: "18:00-02:00",
      friday: "18:00-02:00",
      saturday: "18:00-02:00",
      sunday: "18:00-02:00",
    },
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma@restaurant.com",
    phone: "+1 234-567-8904",
    role: "Manager",
    department: "Management",
    hireDate: "2021-11-03",
    salary: 75000,
    status: "active",
    avatar: "/diverse-team-manager.png",
    performance: {
      rating: 4.9,
      avgServiceTime: "N/A",
      customerScore: 4.8,
      attendance: 98,
    },
    schedule: {
      monday: "08:00-18:00",
      tuesday: "08:00-18:00",
      wednesday: "08:00-18:00",
      thursday: "08:00-18:00",
      friday: "08:00-18:00",
      saturday: "10:00-16:00",
      sunday: "Off",
    },
  },
]

const roles = ["Head Chef", "Sous Chef", "Line Cook", "Waiter", "Bartender", "Host", "Manager", "Dishwasher"]
const departments = ["Kitchen", "Service", "Bar", "Management", "Cleaning"]

export function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<number | null>(null) // Added editing state
  const [editForm, setEditForm] = useState({}) // Added edit form state

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee.id)
    setEditForm(employee)
  }

  const handleSaveEdit = () => {
    // Here you would typically update the employee in your data store
    console.log("Saving employee:", editForm)
    setEditingEmployee(null)
    setEditForm({})
  }

  const handleCancelEdit = () => {
    setEditingEmployee(null)
    setEditForm({})
  }

  const handleDelete = (employeeId: number) => {
    // Here you would typically delete the employee from your data store
    console.log("Deleting employee:", employeeId)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Head Chef":
      case "Manager":
        return "bg-primary text-primary-foreground"
      case "Sous Chef":
        return "bg-secondary text-secondary-foreground"
      case "Waiter":
      case "Bartender":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-500"
    if (rating >= 4.0) return "text-yellow-500"
    return "text-red-500"
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || employee.role === filterRole
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    return matchesSearch && matchesRole && matchesDepartment
  })

  const totalEmployees = employees.length
  const activeEmployees = employees.filter((e) => e.status === "active").length
  const avgRating = employees.reduce((sum, e) => sum + e.performance.rating, 0) / employees.length
  const avgAttendance = employees.reduce((sum, e) => sum + e.performance.attendance, 0) / employees.length

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {" "}
      {/* Added animation */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Employee Management</h1>
          <p className="text-muted-foreground text-pretty">Manage staff, track performance, and optimize scheduling</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover:scale-105 transition-transform duration-200">
              {" "}
              {/* Added hover animation */}
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter employee details and role information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Full Name</Label>
                  <Input id="employeeName" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeEmail">Email</Label>
                  <Input id="employeeEmail" type="email" placeholder="employee@restaurant.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeePhone">Phone</Label>
                  <Input id="employeePhone" placeholder="+1 234-567-8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Input id="hireDate" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input id="salary" type="number" placeholder="50000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Overview Cards - Enhanced with hover animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">{activeEmployees} active employees</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Star className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0 rating</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${employees.reduce((sum, e) => sum + e.salary, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Annual total</p>
          </CardContent>
        </Card>
      </div>
      {/* Employee Management Tabs */}
      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="staff">Staff Directory</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Staff Directory - Enhanced with responsive grid and edit/delete functionality */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      {editingEmployee === employee.id ? (
                        <Input
                          value={editForm.name || employee.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="font-semibold mb-2"
                        />
                      ) : (
                        <h3 className="font-semibold">{employee.name}</h3>
                      )}
                      <Badge
                        className={`${employee.role === "Head Chef" || employee.role === "Manager" ? "bg-primary text-primary-foreground" : employee.role === "Sous Chef" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}`}
                      >
                        {employee.role}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {editingEmployee === employee.id ? (
                        <Input
                          value={editForm.email || employee.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="text-xs"
                        />
                      ) : (
                        <span className="text-muted-foreground">{employee.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {editingEmployee === employee.id ? (
                        <Input
                          value={editForm.phone || employee.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="text-xs"
                        />
                      ) : (
                        <span className="text-muted-foreground">{employee.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Since {employee.hireDate}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span>Performance</span>
                      <div className="flex items-center gap-1">
                        <Star className={`h-3 w-3 ${getPerformanceColor(employee.performance.rating)}`} />
                        <span className={getPerformanceColor(employee.performance.rating)}>
                          {employee.performance.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Attendance</span>
                      <span>{employee.performance.attendance}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {editingEmployee === employee.id ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={handleSaveEdit}>
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleEdit(employee)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {employee.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(employee.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Individual employee performance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Employee</TableHead>
                      <TableHead className="min-w-[120px]">Role</TableHead>
                      <TableHead className="min-w-[120px]">Overall Rating</TableHead>
                      <TableHead className="min-w-[140px]">Avg Service Time</TableHead>
                      <TableHead className="min-w-[130px]">Customer Score</TableHead>
                      <TableHead className="min-w-[120px]">Attendance</TableHead>
                      <TableHead className="min-w-[120px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${employee.role === "Head Chef" || employee.role === "Manager" ? "bg-primary text-primary-foreground" : employee.role === "Sous Chef" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}`}
                          >
                            {employee.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Star className={`h-4 w-4 ${getPerformanceColor(employee.performance.rating)}`} />
                            <span className={getPerformanceColor(employee.performance.rating)}>
                              {employee.performance.rating}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.performance.avgServiceTime}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            {employee.performance.customerScore}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{employee.performance.attendance}%</span>
                            </div>
                            <Progress value={employee.performance.attendance} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {employee.performance.rating >= 4.5 ? (
                            <Badge className="bg-green-500 text-white">Excellent</Badge>
                          ) : employee.performance.rating >= 4.0 ? (
                            <Badge className="bg-yellow-500 text-black">Good</Badge>
                          ) : (
                            <Badge className="bg-red-500 text-white">Needs Improvement</Badge>
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
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Current week staff scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Employee</TableHead>
                      <TableHead className="min-w-[100px]">Monday</TableHead>
                      <TableHead className="min-w-[100px]">Tuesday</TableHead>
                      <TableHead className="min-w-[100px]">Wednesday</TableHead>
                      <TableHead className="min-w-[100px]">Thursday</TableHead>
                      <TableHead className="min-w-[100px]">Friday</TableHead>
                      <TableHead className="min-w-[100px]">Saturday</TableHead>
                      <TableHead className="min-w-[100px]">Sunday</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                              <AvatarFallback className="text-xs">
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{employee.schedule.monday}</TableCell>
                        <TableCell className="text-xs">{employee.schedule.tuesday}</TableCell>
                        <TableCell className="text-xs">{employee.schedule.wednesday}</TableCell>
                        <TableCell className="text-xs">{employee.schedule.thursday}</TableCell>
                        <TableCell className="text-xs">{employee.schedule.friday}</TableCell>
                        <TableCell className="text-xs">{employee.schedule.saturday}</TableCell>
                        <TableCell className="text-xs">{employee.schedule.sunday}</TableCell>
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
              <CardDescription>Monthly attendance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-500">
                          {Math.floor((employee.performance.attendance / 100) * 22)}
                        </p>
                        <p className="text-xs text-muted-foreground">Days Present</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-500">
                          {22 - Math.floor((employee.performance.attendance / 100) * 22)}
                        </p>
                        <p className="text-xs text-muted-foreground">Days Absent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{employee.performance.attendance}%</p>
                        <p className="text-xs text-muted-foreground">Attendance Rate</p>
                      </div>
                      <Progress value={employee.performance.attendance} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
