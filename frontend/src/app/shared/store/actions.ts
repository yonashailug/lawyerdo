import { Room } from '../model/room'
import { User } from './../model/user'

export function addUser(user: User) {
  return {
    type: 'ADD_USER',
    payload: user
  }
}

export function updateRoom(room: Room) {
  return {
    type: 'UPDATE_ROOM',
    payload: room
  }
}
