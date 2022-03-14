import { AppState } from './state'

const intialState: AppState = {
  data: []
}

export function reducer(state: AppState = intialState, action: { type: string, payload: any }) {
  switch(action.type) {
    case 'ADD_USER':
      return {
        data: [ ...state.data, { ...action.payload } ]
      }
    default:
      return state
  }
}
