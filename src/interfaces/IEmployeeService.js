import Employee from '../classes/employee.js'

interface IEmployeeService {
  create(employee: Employee): Promise<Employee | null>;
  getById(id: number): Promise<Employee | null>;
  getAll(): Promise<Employee[]>;
  update(employee: Employee): Promise<Employee | null>;
  delete(id: number): Promise<boolean>;
}

export default IEmployeeService
