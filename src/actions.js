import axios from 'axios'
import { request } from './helpers'

export const GET_USER = 'GET_USER'
export const GET_AUTH = 'GET_AUTH'
export const GET_ALL_MUSEUMS = 'GET_ALL_MUSEUMS'
//export const GET_ALL_USERS = 'GET_ALL_USERS'

const API = `${process.env.REACT_APP_BACKEND}`


export const getAllMuseums = () => (
  dispatch => {
    axios.get(`${API}/api/museums`)
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
