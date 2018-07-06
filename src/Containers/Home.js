import React, { Component } from 'react'
import { Col, Row, Parallax } from 'react-materialize'
import uniqid from 'uniqid'

import { connect } from 'react-redux'
import { museumList } from '../actions'
import { withAuthentication } from '../helpers'

import MuseumCard from '../Components/MuseumCard'

class Home extends Component {
  render() {
    return(
      <div>
        <Row>
          <Parallax imageSrc="http://backgroundcheckall.com/wp-content/uploads/2017/12/museum-background-5.jpg"/>
          <Col s={12} m={12} l={12} xl={12} s2={2} m2={2} l2={3} xl2={3}>
            <div className="section white">
              <div className="row container">
                <h2 className="header">Museum Piece</h2>
                <p className="grey-text text-darken-3 lighten-3">  Museum Piece is a web app reality augementation tool focused on bringing the information of your favorite art right to your phone or tablet.</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
            {
              this.props.museumList.filter((ele, i) => i%2===0 ).map((museum) => {
                return (
                  <Col key={museum.museum_shortid} s={12} m={12} l={6} xl={6} >
                    <MuseumCard className='museumCard' museum={museum}  />
                  </Col>
                )
              })
            }
            {
              this.props.museumList.filter((ele, i) => i%2===1 ).map((museum) => {
                return (
                  <Col key={museum.museum_shortid} s={12} m={12} l={6} xl={6} >
                    <MuseumCard className='museumCard' museum={museum} />
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
export default connect(mapStateToProps)(withAuthentication(Home))
