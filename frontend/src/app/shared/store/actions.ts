import { Room } from '../model/room';
import { User } from './../model/user';

export function addUser(user: User) {
  return {
    type: 'ADD_USER',
    payload: user,
  };
}

export function updateRoom(room: Room) {
  console.log(room)
  return {
    type: 'UPDATE_ROOM',
    payload: room,
  };
}

export function logoutUser() {
  return {
    type: 'LOGOUT_USER',
    payload: null,
  };
}

export function removeRoom(id: string) {
  return {
    type: 'REMOVE_ROOM',
    payload: id
  }
}

export function addRooms(rooms: Room[]) {
  return {
    type: 'SET_ROOMS',
    payload: rooms
  }
}
