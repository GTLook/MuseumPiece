import React, { Component } from 'react'
import {Col, Row, Collapsible, CollapsibleItem } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllGalleries } from '../actions'
import { withAuthentication } from '../helpers'

import ArtCard from '../Components/ArtCard'

class GalleryPage extends Component {

  constructor(props){
    super(props)
    this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)
    this.gallery = this.props.galleryList.find(ele => ele.gallery_title.replace(/\s+/g, '') === this.props.match.params.galleryId)
  }

    // componentDidMount(){
    //   if(this.museum) this.props.getAllGalleries(this.museum.id)
    // }

  render() {
    if(!this.gallery) return <Redirect to="/"/>
    return(
      <div>
        <Link to={`/${this.props.match.params.museumId}/${this.props.match.params.galleryId}/FindArt`}>Find Art</Link>
        <Row className='center'>
          <Col s={8} m={8} l={6} xl={6} s2={2} m2={2} l2={2} xl2={2}>
            <Collapsible  accordion defaultActiveKey={1}>
              {this.gallery.art.map(art => <ArtCard art={art}/>)}
            </Collapsible>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(GalleryPage))
