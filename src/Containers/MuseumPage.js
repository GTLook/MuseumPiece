import React, { Component } from 'react'
import { Col, Row, Parallax, Divider } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllGalleries } from '../actions'
import { withAuthentication } from '../helpers'

import GalleryCard from '../Components/GalleryCard'

class MuseumPage extends Component {

  constructor(props){
    super(props)
    this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)
  }

  componentDidMount(){
    if(this.museum) this.props.getAllGalleries(this.museum.id)
  }

  render() {
    if(!this.museum) return <Redirect to="/"/>
    return(
      <Row>
        <Parallax imageSrc={this.museum.museum_picture}/>
        <Col className="center"  s2={2} m2={2} l2={3} xl2={3}>
          <div className="section">
            <Row className="container">
              <h2 className="header">{this.museum.museum_name}</h2>
              <p className="grey-text text-darken-3 lighten-3"></p>
            </Row>
          </div>
          {this.museum.gallery.map(gallery => <GalleryCard key={gallery.gallery_shortid} path={this.props.location.pathname} gallery={gallery}/>)}
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(MuseumPage))
