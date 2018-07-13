import React, { Component } from 'react'
import { Col, Row, Parallax, Divider } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Swipeable } from 'react-touch'

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
    //
    return(
    <Swipeable onSwipeRight={() => this.props.history.push('/') }>
      <div>
        <Row>
          <Parallax imageSrc={this.museum.museum_picture}/>
          <Col s={12} m={12} l={12} xl={12} s2={2} m2={2} l2={2} xl2={2}>
            <div className="section">
              <Row className="container">
                <h2 className="header">{`The ${this.museum.museum_name}`}</h2>
                <Divider />
                <p className="grey-text text-darken-3 lighten-3 valign-wrapper text">Explore the open galleries.</p>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="padcard" s={12} m={12} l={6} xl={6} >
            {this.museum.gallery.map(gallery => {if(gallery.id%2 === 0) return (
              <GalleryCard key={gallery.gallery_shortid} props={this.props} path={this.props.location.pathname} gallery={gallery}/>
            )})}
          </Col>
          <Col className="museumCardCol" s={12} m={12} l={6} xl={6} >
            {this.museum.gallery.map(gallery => {if(gallery.id%2 === 1) return (
              <GalleryCard key={gallery.gallery_shortid} props={this.props} path={this.props.location.pathname} gallery={gallery}/>
            )})}
          </Col>
        </Row>
      </div>
    </Swipeable>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(MuseumPage))
