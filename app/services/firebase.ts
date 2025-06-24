import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  writeBatch,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import type { EmployeeData, Employee } from "../types/employee"

const EMPLOYEES_COLLECTION = "employees"

/**
 * Initial list of employees to populate the database.
 * @type {EmployeeData[]}
 */
const initialEmployees: EmployeeData[] = [
  {
    name: "Fernanda Torres",
    email: "fernandatorres@flugo.com",
    department: "Design",
    isActive: true,
  },
  {
    name: "Joana D'Arc",
    email: "joanadarc@flugo.com",
    department: "Information Technology",
    isActive: true,
  },
  {
    name: "Mari Froes",
    email: "marifroes@flugo.com",
    department: "Marketing",
    isActive: true,
  },
  {
    name: "Clara Costa",
    email: "claracosta@flugo.com",
    department: "Human Resources",
    isActive: false,
  },
  {
    name: "João Silva",
    email: "joaosilva@flugo.com",
    department: "Information Technology",
    isActive: true,
  },
  {
    name: "Maria Santos",
    email: "mariasantos@flugo.com",
    department: "Finance",
    isActive: true,
  },
]

/**
 * Populates the database with initial employees data if none exists.
 * @returns {Promise<void>}
 * @throws Throws an error if the operation fails.
 */
export const populateInitialData = async (): Promise<void> => {
  try {
    console.log("Checking if data already exists...")

    const q = query(collection(db, EMPLOYEES_COLLECTION))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log("Populating initial data...")

      const batch = writeBatch(db)
      const employeesRef = collection(db, EMPLOYEES_COLLECTION)

      initialEmployees.forEach((employee) => {
        const docRef = doc(employeesRef)
        batch.set(docRef, {
          ...employee,
          createdAt: Timestamp.now(),
        })
      })

      await batch.commit()
      console.log("Initial data successfully populated.")
    } else {
      console.log("Data already exists in the database.")
    }
  } catch (error) {
    console.error("Error populating initial data:", error)
    throw error
  }
}

/**
 * Retrieves all employees ordered by creation date descending.
 * @returns {Promise<Employee[]>} List of employees.
 * @throws Throws an error if the operation fails.
 */
export const getEmployees = async (): Promise<Employee[]> => {
  try {
    console.log("Loading employees from Firestore...")

    const q = query(collection(db, EMPLOYEES_COLLECTION), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const employees: Employee[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      employees.push({
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        department: data.department || "",
        isActive: data.isActive ?? true,
        createdAt: data.createdAt?.toDate() || new Date(),
      })
    })

    console.log(`Loaded ${employees.length} employees.`)
    return employees
  } catch (error) {
    console.error("Error loading employees:", error)
    throw new Error("Failed to load employees.")
  }
}

/**
 * Saves a new employee to the database.
 * @param {EmployeeData} employeeData - The employee data to save.
 * @returns {Promise<string>} The ID of the saved employee document.
 * @throws Throws an error if the operation fails.
 */
export const saveEmployee = async (employeeData: EmployeeData): Promise<string> => {
  try {
    console.log("Saving employee:", employeeData)

    const docData = {
      name: employeeData.name || "",
      email: employeeData.email || "",
      department: employeeData.department || "",
      isActive: employeeData.isActive ?? true,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, EMPLOYEES_COLLECTION), docData)
    console.log("Employee saved with ID:", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("Error saving employee:", error)
    throw new Error("Failed to save employee.")
  }
}

/**
 * Updates an existing employee in the database.
 * @param {string} id - The ID of the employee document to update.
 * @param {Partial<EmployeeData>} data - Partial data to update.
 * @returns {Promise<void>}
 * @throws Throws an error if the operation fails.
 */
export const updateEmployee = async (id: string, data: Partial<EmployeeData>): Promise<void> => {
  try {
    console.log("Updating employee:", id, data)

    const docRef = doc(db, EMPLOYEES_COLLECTION, id)
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    }

    await updateDoc(docRef, updateData)
    console.log("Employee successfully updated.")
  } catch (error) {
    console.error("Error updating employee:", error)
    throw new Error("Failed to update employee.")
  }
}

/**
 * Deletes an employee from the database.
 * @param {string} id - The ID of the employee document to delete.
 * @returns {Promise<void>}
 * @throws Throws an error if the operation fails.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    console.log("Deleting employee:", id)

    const docRef = doc(db, EMPLOYEES_COLLECTION, id)
    await deleteDoc(docRef)

    console.log("Employee successfully deleted.")
  } catch (error) {
    console.error("Error deleting employee:", error)
    throw new Error("Failed to delete employee.")
  }
}

/**
 * Toggles the active status of an employee.
 * @param {string} id - The ID of the employee document.
 * @param {boolean} currentStatus - The current active status.
 * @returns {Promise<void>}
 * @throws Throws an error if the operation fails.
 */
export const toggleEmployeeStatus = async (id: string, currentStatus: boolean): Promise<void> => {
  try {
    console.log(`Changing employee status ${id} from ${currentStatus} to ${!currentStatus}`)
    await updateEmployee(id, { isActive: !currentStatus })
    console.log("Status successfully changed.")
  } catch (error) {
    console.error("Error changing status:", error)
    throw new Error("Failed to change employee status.")
  }
}
