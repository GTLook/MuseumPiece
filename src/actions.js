import axios from 'axios'
import { request } from './helpers'

export const GET_USER = 'GET_USER'
export const GET_AUTH = 'GET_AUTH'
export const GET_ALL_MUSEUMS = 'GET_ALL_MUSEUMS'
export const POST_GOOGLE_API = 'POST_GOOGLE_API'
//export const GET_ALL_USERS = 'GET_ALL_USERS'

const API = `${process.env.REACT_APP_BACKEND}`
const googleAPIkey = `${process.env.API_KEY}`

export const getAllMuseums = () => (
  dispatch => {
    axios.get(`${API}/api/museum/`)
    .then((response) => {
      dispatch({
        type: GET_ALL_MUSEUMS,
        payload: response.data.data
      })
    })
  }
)

export const getAuth = () => (
  dispatch => {
    axios.get(`${API}/auth/`)
    .then((response) => {
      dispatch({
        type: GET_AUTH,
        payload: response.data.data
      })
    })
  }
)

export const getUser = () => (
  dispatch => {
    axios.get(`${API}/users/`)
    .then((response) => {
      dispatch({
        type: GET_USER,
        payload: response.data.data
      })
    })
  }
)

// export const visionAPI = () => (
//   dispatch => {
//     axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${googleAPIkey}`)
//     .then((response) => {
//       type: POST_GOOGLE_API,
//       payload: payload
//     })
//   }
// )


// export const getAllUsers = () => (
//   dispatch => {
//     axios.get(`${API}/users/`)
//     .then((response) => {
//       dispatch({
//         type: GET_ALL_USERS,
//         payload: response.data.data
//       })
//     })
//   }
// )
