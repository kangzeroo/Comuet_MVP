import {
  SAVE_POSTS,
  SET_PICKUP,
  SET_DROPOFF,
} from '../action_types'

// change the language of the app
export const savePostsToRedux = (posts) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_POSTS,
      payload: posts,
    })
  }
}

export const setReduxPickup = (pickup) => {
  return (dispatch) => {
    dispatch({
      type: SET_PICKUP,
      payload: pickup,
    })
  }
}

export const setReduxDropoff = (dropoff) => {
  return (dispatch) => {
    dispatch({
      type: SET_DROPOFF,
      payload: dropoff,
    })
  }
}
