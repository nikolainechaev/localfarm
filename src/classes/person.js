class Person {
	protected firstName: String;
	protected lastName:

	constructor(firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
export default Person;