import React, { Component } from 'react'
import { Col, Row, Collection, CollectionItem, Divider, Tabs, Tab, Card, CardTitle } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Swipeable } from 'react-touch'

import { getAllMuseums, getAllGalleries } from '../actions'
import { withAuthentication } from '../helpers'

import ArtCard from '../Components/ArtCard'
import ArtImage from '../Components/ArtImage'

class GalleryPage extends Component {

  constructor(props){
    super(props)
    this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)
    this.gallery = this.props.galleryList.find(ele => ele.gallery_title.replace(/\s+/g, '') === this.props.match.params.galleryId)
    this.state = {
      activeArt: this.gallery ? this.gallery.art[0] : {}
    }
  }

  setActiveArt = (art) => {
    this.setState({activeArt: art})
  }

  scrollActiveArt = (direction) => {
    const index = this.gallery.art.findIndex(art => art.art_title == this.state.activeArt.art_title)
      if(direction === "right") return this.props.history.push(`${this.museum.museum_name.replace(/\s+/g, '')}`)
      if(direction === "up") return this.setActiveArt((index < (this.gallery.art.length-1)) ? this.gallery.art[index+1] : this.gallery.art[0] )
      if(direction === "down") return this.setActiveArt((index > 0) ? this.gallery.art[index-1] : this.gallery.art[this.gallery.art.length-1])
  }

  render() {
    if(!this.gallery) return <Redirect to="/"/>
    return(
      <Swipeable
        onSwipeRight={() => this.props.history.goBack()}
        onSwipeUp={ () => this.scrollActiveArt("up")}
        onSwipeDown={ () => this.scrollActiveArt("down")} >
        <Row>
          <Col className="" s={12} m={12} l={6} xl={6}>
            <Collection>
              {
                this.gallery.art.map(art => {
                  return (
                    <CollectionItem key={art.art_shortid} onClick={() => this.setActiveArt(art)}>
                      <p>{art.art_title}</p>
                    </CollectionItem> )
                  })
                }
              </Collection>
            </Col>
            <Col className="" s={12} m={12} l={6} xl={6}>
              <Tabs className='z-depth-1 swipeable'>
                <Tab title="Art">
                  <Card header={<CardTitle reveal image={this.state.activeArt.art_picture_url} waves='light'/>}
                    title={this.state.activeArt.art_titile}
                    reveal={<p>{this.state.activeArt.art_text}</p>}>
                    <p>{this.state.activeArt.art_flavor}</p>
                  </Card>
                </Tab>
                <Tab title="Search" >
                  <ArtImage museum={this.museum} gallery={this.gallery} setActiveArt={this.setActiveArt}/>
                </Tab>
                <Tab title="Audio">Test 3</Tab>
              </Tabs>
            </Col>
        </Row>
      </Swipeable>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(GalleryPage))
