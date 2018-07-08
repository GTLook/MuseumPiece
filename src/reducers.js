import { combineReducers } from 'redux'

import { GET_ALL_MUSEUMS,  GET_ALL_GALLERIES, GET_USER, GET_AUTH } from './actions'

const INITIAL_VALUE = []

const museumList = (state = INITIAL_VALUE, action) => {
  switch(action.type){
    case GET_ALL_MUSEUMS: return action.payload
    default: return state
  }
}

const galleryList = (state = INITIAL_VALUE, action) => {
  switch(action.type){
    case GET_ALL_GALLERIES: return action.payload
    default: return state
  }
}

const user = (state = INITIAL_VALUE, action) => {
  switch(action.type){
    case GET_USER: return action.payload
    default: return state
  }
}

const auth = (state = INITIAL_VALUE, action) => {
  switch(action.type){
    case GET_AUTH: return action.payload
    default: return state
  }
}

export default combineReducers({ museumList, galleryList, user, auth })
