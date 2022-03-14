export enum Role { ADMIN, USER }
export enum Status { ACTIVE, INACTIVE }

export class User {

    public static EMPTY_USER = new User()

    private id: string = ''
    private email: string = ''
    private name: string = ''
    private password: string = ''

    getId(): string { return this.id }
    getEmail(): string { return this.email }
    setEmail(value: string) { this.email = value }
    getName(): string { return this.name }
    setName(value: string) { this.name = value }
    setPassword(value: string) { this.password = value }

    public static fromObject(object: Object): User {
        const user: User = new User()
        Object.assign(user, object)
        return user
    }

}
