import React, {Component} from 'react'
import {Col, Row} from 'react-materialize'

import {connect} from 'react-redux'
import { withAuthentication } from '../helpers'

class MuseumPage extends Component {
  constructor(props){
    super(props)
    // this.state = {activeReview: {id:null, text:'', rating:null}}
  }

 render(){
  return (
    <div >
      <p> This is the Museum Component </p>
    </div>
  )}
}

const mapStateToProps = ({museumList}) => ({museumList})
export default connect(mapStateToProps)(withAuthentication(MuseumPage))
