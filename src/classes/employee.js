import Person from './person';
class Employee extends Person {
  private id: number;
  private hire_date: Date;
  private salary: number;

  constructor(
    id: number,
    firstName: string;
    lastName: string;
    hire_date: Date;
    salary: number;
  ) {
    super(firstName, lastName);
    this.id = id;
    this.hire_date = hire_date;
    this.salary = salary;
  }
  public getId(): number {
    return this.id;
  }
  public toJSON(): object {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      hire_date: this.hire_date,
      salary: this.salary
    };
  }
}
export default Employee