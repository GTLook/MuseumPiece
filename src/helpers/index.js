import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

////////////////////////////////////////////////////////////////////
/// AuthenticationWrapper //////////////////////////////////////////

class AuthenticationWrapper extends Component{
  constructor(props){
    super(props)

    this.state = {
      authState: null,
      authStatePending: true
    }
  }

  handleAuthState = (authState) => {
    this.setState({ authState, authStatePending: false})
  }

  componentWillMount(){
    const authState = AuthenticationService.getAuthState()
    this.setState({ authState, authStatePending: authState ? false : true })

    AuthenticationService.registerEvent(this.handleAuthState)
  }

  componentWillUnmount(){
    AuthenticationService.deRegisterEvent(this.handleAuthState)
  }

  render(){
    const { Component, ...props} = this.props
    return (
      <Component {...props} authState={this.state.authState} authStatePending={this.state.authStatePending}/>
    )
  }

}

export const withAuthentication = (Component) =>
  (props) =>
    <AuthenticationWrapper Component={Component} {...props}/>

////////////////////////////////////////////////////////////////////
/// AuthenticationService //////////////////////////////////////////

class AuthService{
  constructor(){
    if(!AuthService.instance){
      this.authState = null
      this.registeredCallbacks = []
      AuthService.instance = this
      return AuthService.instance
    }
    else {
      return AuthService.instance
    }
  }
  setAuthState(val){
    this.authState = val
    this.registeredCallbacks.forEach(cb => cb(this.authState))
  }
  getAuthState(){
    return this.authState
  }
  registerEvent(cb){
    this.registeredCallbacks.push(cb)
  }
  deRegisterEvent(cb){
    this.registeredCallbacks = this.registeredCallbacks.filter(ele => ele !== cb)
  }
}
export const AuthenticationService = new AuthService()

////////////////////////////////////////////////////////////////////
/// AuthenticatedRoute /////////////////////////////////////////////

const AuthRoute = (props) => {
  if(props.authStatePending && !props.authState){
    return props.loading || <div>Loading...</div>
  }
  else {
    return props.authState ? <Route {...props} /> : <Redirect to='/' />
  }
}

export const AuthenticatedRoute = withAuthentication(AuthRoute)

////////////////////////////////////////////////////////////////////
/// request ////////////////////////////////////////////////////////

export const request = (path, method = 'get', body = null) => {
  let bearerToken = ''
  const token = localStorage.getItem('token')

  if(token){
    bearerToken = `Bearer ${token}`
  }

  return axios(`${process.env.REACT_APP_BACKEND}${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
    },
    data: body
  })
  .catch(function(error){
    if(error.response.status === 401){
      AuthenticationService.setAuthState(null)
    }
    return Promise.reject()
  })
}
