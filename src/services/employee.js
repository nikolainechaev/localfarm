import { supabase } from '../../db/client.js'
import IEmployeeService from '../interfaces/IEmployeeService.js'
import { Employee } from '../classes/employee.js'

class EmployeeService implements IEmployeeService {
  // Create new employee
  async create(employee: Employee): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .insert([employee.toJSON()])
      .select()
      .single()

    if (error) {
      console.error('Error creating employee:', error)
      return null
    }
    return new Employee(
      data.id,
      data.first_name,
      data.last_name,
      new Date(data.hire_date),
      data.salary
    )
  }

  // Get all employees
  async getAll(): Promise<Employee[]> {
    const { data, error } = await supabase.from('employees').select('*')

    if (error) {
      console.error('Error fetching employees:', error)
      return []
    }
    return data.map(
      (emp) =>
        new Employee(
          emp.id,
          emp.first_name,
          emp.last_name,
          new Date(emp.hire_date),
          emp.salary
        )
    )
  }

  // Get employee by ID
  async getById(id: number): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching employee:', error)
      return null
    }
    return new Employee(
      data.id,
      data.first_name,
      data.last_name,
      new Date(data.hire_date),
      data.salary
    )
  }

  // Update employee
  async update(employee: Employee): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .update(employee.toJSON())
      .eq('id', employee.getId())
      .select()
      .single()

    if (error) {
      console.error('Error updating employee:', error)
      return null
    }
    return new Employee(
      data.id,
      data.first_name,
      data.last_name,
      new Date(data.hire_date),
      data.salary
    )
  }

  // Delete employee
  async delete(id: number): Promise<boolean> {
    const { error } = await supabase.from('employees').delete().eq('id', id)

    if (error) {
      console.error('Error deleting employee:', error)
      return false
    }
    return true
  }
}
