import React, { Component } from 'react'
import {Col, Row, Collapsible, CollapsibleItem } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { museumList, galleryList } from '../actions'
import { withAuthentication } from '../helpers'

import ArtCard from '../Components/ArtCard'

class GalleryPage extends Component {

  constructor(props){
    super(props)
    this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)
  }

    componentDidMount(){
      if(this.museum) this.props.getAllGalleries(this.museum.id)
    }

  render() {
    if(!this.gallery) return <Redirect to="/"/>
    return(
      <div>
        <Row>
          <Col>
            <Collapsible accordion defaultActiveKey={1}>
              {this.gallery.map(ary => <ArtCard art={"art"}/>)}
            </Collapsible>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
export default connect(mapStateToProps)(withAuthentication(GalleryPage))
