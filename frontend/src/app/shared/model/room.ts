import { User } from './user'

export class Room {

    public static EMPTY_ROOM = new Room()

    private id: string = ''
    private roomId: string = ''
    private name: string = ''
    private description: string = ''
    private userId: User = User.EMPTY_USER
    private members: Array<string> = []
    private photo: string = ''
    private access_key: string = ''


    getId(): string { return this.id }
    getRoomId(): string { return this.roomId }
    getName(): string { return this.name }
    getDescription(): string { return this.description }
    getUserId(): User { return this.userId }
    getMembers(): Array<string> { return this.members }
    getPhoto(): string { return this.photo }
    getAccessKey(): string { return this.access_key }

    setAccessKey(accessKey: string) { this.access_key = accessKey }

    public static fromObject(object: Object): Room {
        const room: Room = new Room()
        Object.assign(room, object)
        return room
    }

}
