import { supabase } from '../lib/supabase'
import { Employee } from '../objects/employee.js'

export const employeeService = {
  // Create new employee
  async create(employee: Omit<Employee, 'id'>): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .insert([employee])
      .select()
      .single()

    if (error) {
      console.error('Error creating employee:', error)
      return null
    }
    return data
  },

  // Get all employees
  async getAll(): Promise<Employee[]> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching employees:', error)
      return []
    }
    return data || []
  },

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
    return data
  },

  // Update employee
  async update(
    id: number,
    updates: Partial<Employee>
  ): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating employee:', error)
      return null
    }
    return data
  },

  // Delete employee
  async delete(id: number): Promise<boolean> {
    const { error } = await supabase.from('employees').delete().eq('id', id)

    if (error) {
      console.error('Error deleting employee:', error)
      return false
    }
    return true
  },
}
