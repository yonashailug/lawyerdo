import { User } from './../model/user'
import { Room } from '../model/room'

export interface AppState {
  user: User,
  room: Room,
  rooms: Room[]
}
