import axios from 'axios'
import moment from 'moment'
import { POSTS_BACKEND } from '../API_URLS'
import { authHeaders } from '../authHeaders'

export const getPosts = ({ pickup_gps, dropoff_gps }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${POSTS_BACKEND}/retrieve_rides`, { pickup_gps, dropoff_gps }, authHeaders)
      .then((data) => {
        console.log(data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const savePost = (postData) => {
  const p = new Promise((res, rej) => {
    axios.post(`${POSTS_BACKEND}/create_ride`, postData, authHeaders)
      .then((data) => {
        console.log(data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
