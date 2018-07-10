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
    this.state = {
      activeArt: 0
    }
  }

  // componentDidMount() {
  //   updateArt().then(response => {
  //     this.setState({
  //       posts: response.posts
  //     });
  //   });

  render() {
    if(!this.gallery) return <Redirect to="/"/>
    return(
      <div>
        <Link to={`/${this.props.match.params.museumId}/${this.props.match.params.galleryId}/FindArt`}>Find Art</Link>
        <Row className='center'>
          <Col s={12} m={12} l={6} xl={6}>
            <Collapsible  accordion activeKey={0}>
              {this.gallery.art.map(art => <ArtCard key={art.art_shortid} art={art}/>)}
            </Collapsible>
          </Col>
          <Col className="hide-on-med-and-down" s={0} m={0} l={6} xl={6}>
            <img className="materialboxed" src={this.gallery.art[this.state.activeArt].art_picture_url}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(GalleryPage))
