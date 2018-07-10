import React, { Component } from 'react'
import { Col, Row, Parallax, Divider } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { museumList } from '../actions'
import { withAuthentication } from '../helpers'
import { getAllMuseums } from '../actions'

import MuseumCard from '../Components/MuseumCard'

class Home extends Component {

  componentDidMount(){
    this.props.getAllMuseums()
    // request('/auth/token')
    //   .then(response => {
    //     AuthenticationService.setAuthState(response.data)
    //     return request('/users')
    //   })
    //   .then(response => {
    //     const authState = AuthenticationService.getAuthState()
    //     const activeUser = response.data.data.find(el => el.id === authState.id)
    //     AuthenticationService.setAuthState(activeUser)
    //   })
  }

  render() {
    return(
      <div>
        <Row>
          <Parallax imageSrc="http://backgroundcheckall.com/wp-content/uploads/2017/12/museum-background-5.jpg"/>
          <Col s={12} m={12} l={12} xl={12} >
            <div className="section">
              <div className="row container">
                <h2 className="header">Museum Piece</h2>
                <Divider/>
                <p className="grey-text text-darken-3 lighten-3"> Museum Piece is a mobile first web app that creates a augemented reality expereince focused on bringing the information of your favorite art right to your phone or tablet.</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="museumList">
            {
              this.props.museumList.filter((ele, i) => i%2===0 ).map((museum) => {
                return (
                  <Col key={museum.museum_shortid} s={12} m={12} l={6} xl={6} >
                    <MuseumCard museum={museum}  />
                  </Col>
                )
              })
            }
            {
              this.props.museumList.filter((ele, i) => i%2===1 ).map((museum) => {
                return (
                  <Col key={museum.museum_shortid} s={12} m={12} l={6} xl={6} >
                    <MuseumCard museum={museum} />
                  </Col>
                )
              })
            }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({museumList}) => ({museumList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllMuseums}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(Home))
