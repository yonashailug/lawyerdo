import { Room } from '../model/room';
import { User } from '../model/user';
import { AppState } from './state';

const intialState: AppState = {
  user: User.EMPTY_USER,
  room: Room.EMPTY_ROOM,
};

export function reducer(
  state: AppState = intialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        user: User.fromObject({ ...state.user, ...action.payload }),
      };
    case 'UPDATE_ROOM':
      return {
        ...state,
        room: Room.fromObject({ ...state.room, ...action.payload }),
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: User.EMPTY_USER,
      };
    default:
      return state;
  }
}
