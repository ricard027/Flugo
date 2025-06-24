export interface EmployeeData {
  name: string
  email: string
  isActive: boolean
  department: string
}

export interface Employee extends EmployeeData {
  id: string
  createdAt: Date
}
