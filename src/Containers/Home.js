import React, { Component } from 'react'
import {Col, Row, Parallax } from 'react-materialize'

import { connect } from 'react-redux'
import { museumList } from '../actions'
import { withAuthentication } from '../helpers'

import HomeMuseumCard from '../Components/HomeMuseumCard'

class Home extends Component {
  render() {
    return(
      <div>
        <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg"/>
        <div className="section white">
          <div className="row container">
            <h2 className="header">Museum Piece</h2>
            <p className="grey-text text-darken-3 lighten-3">Museum Piece is a web app reality augementation tool focused on bringing the information of your favorite art right to your phone or tablet.</p>
          </div>
        </div>
        {this.props.museumList.map(museum => <HomeMuseumCard key={museum.museum_shortid} info={museum}/>)}
      </div>
    )
  }
}

const mapStateToProps = ({museumList}) => ({museumList})
export default connect(mapStateToProps)(withAuthentication(Home))
