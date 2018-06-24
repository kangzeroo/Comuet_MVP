import axios from 'axios'
import moment from 'moment'
import { POSTS_BACKEND } from '../API_URLS'
import { authHeaders } from '../authHeaders'

export const getPosts = ({ pickup_gps, dropoff_gps }) => {
  const p = new Promise((res, rej) => {
    // axios.post(POSTS_BACKEND, { pickup, dropoff }, authHeaders)
    //   .then((data) => {
    //     console.log(data)
    //     res(data.data)
    //   })
    //   .catch((err) => {
    //     rej(err)
    //   })
    res([
			{ id: '1', pickup: 'Bk Waterloo', dropoff: 'Union Station', driver: 'Steve Zhang', price: 15, time: moment().add(2, 'hours').fromNow() },
			{ id: '2', pickup: 'Bk Waterloo', dropoff: 'Union Station', driver: 'Steve Zhang', price: 15, time: moment().add(3, 'hours').fromNow() },
			{ id: '3', pickup: 'Bk Waterloo', dropoff: 'Union Station', driver: 'Steve Zhang', price: 15, time: moment().add(4, 'hours').fromNow() },
			{ id: '4', pickup: 'Bk Waterloo', dropoff: 'Union Station', driver: 'Steve Zhang', price: 15, time: moment().add(5, 'hours').fromNow() },
			{ id: '5', pickup: 'Bk Waterloo', dropoff: 'Union Station', driver: 'Steve Zhang', price: 15, time: moment().add(1, 'hours').fromNow() }
		])

    // {
    //   post_id: '',
    //   pickup_address: '',
    //   pickup_gps: [],
    //   dropoff_address: '',
    //   dropoff_gps: [],
    //   driver_name: '',
    //   driver_phone: '',
    //   price: 0,
    //   time: '',
    //   description: '',
    // }
  })
  return p
}

export const savePost = (postData) => {
  const p = new Promise((res, rej) => {
    // axios.post(POSTS_BACKEND, postData, authHeaders)
    //   .then((data) => {
    //     console.log(data)
    //     res(data.data)
    //   })
    //   .catch((err) => {
    //     rej(err)
    //   })
    res('Success')
  })
  return p
}
