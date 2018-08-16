import React, { Component } from 'react'
import { Col, Row, Parallax, Divider, Navbar, NavItem } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Swipeable } from 'react-touch'
import { Link } from 'react-router-dom'

import { museumList } from '../actions'
import { withAuthentication } from '../helpers'
import { getAllMuseums } from '../actions'

import MuseumCard from '../Components/MuseumCard'

class Home extends Component {

  componentDidMount(){
    this.props.getAllMuseums()
  }

  render() {
    return(
      <div>
        <Row>
          <Navbar brand={`Museum Piece`} right={true}>
            <NavItem ><i className="far fa-user"></i></NavItem>
          </Navbar>
        </Row>
        <Row>
          <div>
            <Parallax imageSrc="http://backgroundcheckall.com/wp-content/uploads/2017/12/museum-background-5.jpg"/>
          </div>
          <Col s={1} m={1} l={1} xl={1} > </Col>
          <Col s={10} m={10} l={10} xl={10}>
            <Col  >
              <div className="section">
                <div className="row container">
                  <h2 className="header">Museum Piece</h2>
                  <Divider/>
                  <p className="grey-text text-darken-3 lighten-3 space"> Museum Piece is a mobile first web app that creates a augemented reality expereince focused on bringing the information of your favorite art right to your phone or tablet.</p>

                  <p className="grey-text text-darken-3 lighten-3">  Select a Museum to start exploring.</p>
                </div>
              </div>
            </Col>
            {
              this.props.museumList.filter((ele, i) => i%2===0 ).map((museum) => {
                return (
                  <Col className="section" key={museum.museum_shortid} s={12} m={12} l={6} xl={6} >
                    <Swipeable onSwipeLeft={ () => this.props.history.push(`${museum.museum_name.replace(/\s+/g, '')}`) }>
                      <Link to={`${museum.museum_name.replace(/\s+/g, '')}`}>
                        <MuseumCard museum={museum}/>
                      </Link>
                    </Swipeable>
                  </Col>
                )
              })
            }
            {
              this.props.museumList.filter((ele, i) => i%2===1 ).map((museum) => {
                return (
                  <Col className="section" key={museum.museum_shortid} s={12} m={12} l={6} xl={6} >
                    <Swipeable onSwipeLeft={ () => this.props.history.push(`${museum.museum_name.replace(/\s+/g, '')}`) }>
                      <Link to={`${museum.museum_name.replace(/\s+/g, '')}`}>
                        <MuseumCard museum={museum}/>
                      </Link>
                    </Swipeable>
                  </Col>
                )
              })
            }
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({museumList}) => ({museumList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllMuseums}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(Home))
