import { supabase } from '../../db/client.js';
import type { IEmployeeService } from '../interfaces/IEmployeeService.js';
import { Employee } from '../classes/employee.js';

export class EmployeeService implements IEmployeeService {
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
      data.first_name,
      data.last_name,
      new Date(data.hire_date),
      data.salary,
      data.uuid
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
      (emp: any) =>
        new Employee(
          emp.first_name,
          emp.last_name,
          new Date(emp.hire_date),
          emp.salary,
          emp.uuid,
        )
    )
  }

  // Get employee by ID
  async getById(uuid: string): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('uuid', uuid)
      .single()

    if (error) {
      console.error('Error fetching employee:', error)
      return null
    }
    return new Employee(
      data.first_name,
      data.last_name,
      new Date(data.hire_date),
      data.salary,
      data.uuid
    )
  }

  // Update employee
  async update(employee: Employee): Promise<Employee | null> {
    const uuid = employee.getUuid();
    if (!uuid) {
      console.error('Missing uuid on employee for update');
      return null;
    }
  
    const { data, error } = await supabase
      .from('employees')
      .update(employee.toJSON())
      .eq('uuid', uuid)
      .select()
      .single()

    if (error) {
      console.error('Error updating employee:', error)
      return null
    }
    return new Employee(
      data.first_name,
      data.last_name,
      new Date(data.hire_date),
      data.salary,
      data.uuid
    )
  }

  // Delete employee
  async delete(uuid: string): Promise<boolean> {
    const { error } = await supabase.from('employees').delete().eq('uuid', uuid)

    if (error) {
      console.error('Error deleting employee:', error)
      return false
    }
    return true
  }
}

