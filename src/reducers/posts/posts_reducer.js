import {
  SAVE_POSTS,
  SET_PICKUP,
  SET_DROPOFF,
} from '../../actions/action_types'

const INITIAL_STATE = {
  posts: [],
  pickup: { pickup_address: 'Waterloo, ON', pickup_gps: [-80.5204096,43.4642578]},
  dropoff: { dropoff_address: 'Toronto, ON', dropoff_gps: [-79.3831843,43.6532260]}
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case SAVE_POSTS:
      return {
        ...state,
        posts: action.payload,
      }
    case SET_PICKUP:
      return {
        ...state,
        pickup: action.payload,
      }
    case SET_DROPOFF:
      return {
        ...state,
        dropoff: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
