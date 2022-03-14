import { User } from './../model/user'

export function addUser(user: User) {
  return {
    type: 'ADD_USER',
    payload: user
  }
}
