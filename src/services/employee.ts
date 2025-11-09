import { supabase } from '../../db/client.js';
import type { IEmployeeService } from '../interfaces/IEmployeeService.js';
import { Employee } from '../classes/employee.js';
import { IEmployeeDTO } from '../interfaces/IEmployeeDTO.js';

export class EmployeeService implements IEmployeeService {
    private mapToEmployee(data: IEmployeeDTO): Employee {
    return new Employee(
      data.first_name,
      data.last_name, 
      new Date(data.hire_date),
      data.salary,
      data.uuid
    );
  }
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
    return this.mapToEmployee(data)
  }

  // Get all employees
  async getAll(): Promise<Employee[]> {
    const { data, error } = await supabase.from('employees').select('*')

    if (error) {
      console.error('Error fetching employees:', error)
      return []
    }
    return data.map(emp => this.mapToEmployee(emp))
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
    return this.mapToEmployee(data)
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
    return this.mapToEmployee(data)
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

