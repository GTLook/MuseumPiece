import React, { Component } from 'react'
import { Col, Row, Parallax } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { museumList } from '../actions'
import { withAuthentication } from '../helpers'

import GalleryCard from '../Components/GalleryCard'

class MuseumPage extends Component {
  constructor(props){
    super(props)
    this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)

  }

  render() {
    if(!this.museum) return <Redirect to="/"/> 
    return(
      <div>
        <Parallax imageSrc={this.museum.museum_picture}/>
        <div className="section white">
          <div className="row container">
            <h2 className="header">{this.museum.museum_name}</h2>
            <p className="grey-text text-darken-3 lighten-3"></p>
          </div>
        </div>
        {this.museum.gallery.map(gallery => <GalleryCard key={gallery.gallery_shortid} path={this.props.location.pathname} gallery={gallery}/>)}
      </div>
    )
  }
}

const mapStateToProps = ({museumList}) => ({museumList})
export default connect(mapStateToProps)(withAuthentication(MuseumPage))
