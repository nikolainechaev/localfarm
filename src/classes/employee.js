import Person from './person';
class Employee extends Person {
  private id: Number;
  private hire_date: string;
  private salary: number;

  constructor(
    id: number,
    firstName: string;
    lastName: string;
    hireDate: Date;
    salary: number;
  ) {
    super(firstName, lastName);
    this.id = id;
    this.hire_date = hireDate;
    this.salary = salary;
  }
  public getId(): number {
    return this.id;
  }
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
  public toJSON(): object {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      hire_date: this.hireDate,
      salary: this.salary
    };
  }
}
export default Employee