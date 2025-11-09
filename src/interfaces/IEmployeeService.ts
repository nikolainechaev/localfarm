import { Employee } from '../classes/employee.js';

export interface IEmployeeService {
  create(employee: Employee): Promise<Employee | null>;
  getById(uuid: string): Promise<Employee | null>;
  getAll(): Promise<Employee[]>;
  update(employee: Employee): Promise<Employee | null>;
  delete(uuid: string): Promise<boolean>;
}

