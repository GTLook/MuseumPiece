import axios from 'axios'
import { request } from './helpers'

export const GET_USER = 'GET_USER'
export const GET_AUTH = 'GET_AUTH'
export const GET_ALL_MUSEUMS = 'GET_ALL_MUSEUMS'
export const GET_ALL_GALLERIES = 'GET_ALL_GALLERIES'
export const POST_GOOGLE_API = 'POST_GOOGLE_API'

const API = `${process.env.REACT_APP_BACKEND}`
const googleAPIkey = process.env.API_KEY

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

export const getAllGalleries = (museumId) => (
  dispatch => {
    axios.get(`${API}/api/museum/${museumId}/gallery`)
    .then((response) => {
      dispatch({
        type: GET_ALL_GALLERIES,
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
