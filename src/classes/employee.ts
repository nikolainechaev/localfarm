import { Person } from './person.js';
class Employee extends Person {
  private uuid?: string;
  private hire_date: Date;
  private salary: number;

  constructor(
    firstName: string,
    lastName: string,
    hire_date: Date,
    salary: number,
    uuid?: string,
  ) {
    super(firstName, lastName);
    this.uuid = uuid;
    this.hire_date = hire_date;
    this.salary = salary;
  }
  public getUuid(): string | undefined {
    return this.uuid;
  }
  public toJSON(): object {
    const base: any = {
      first_name: this.firstName,
      last_name: this.lastName,
      hire_date: this.hire_date,
      salary: this.salary
    };
    if (this.uuid) base.uuid = this.uuid;
      return base;
    }
}
export { Employee };